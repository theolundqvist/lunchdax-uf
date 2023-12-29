package com.example.theod.myapplication;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;

import android.location.Location;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.RecyclerView;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static com.google.android.gms.location.LocationServices.getFusedLocationProviderClient;
import static java.lang.Math.abs;
import static java.lang.Math.acos;
import static java.lang.Math.cos;
import static java.lang.Math.sin;
import static java.lang.Math.sqrt;
import static java.lang.Math.toRadians;
import static java.lang.String.valueOf;
import static java.util.Objects.requireNonNull;

public class MainActivity extends AppCompatActivity {


// ...

    public static List<Dish> dishList = new ArrayList<>();

    public RecyclerView.Adapter<RecyclerView.ViewHolder> adapter;

    public static double userLat;
    public static double userLong;

    public String lastCityId = "h";
    public RequestQueue queue;


    private FusedLocationProviderClient mFusedLocationClient;

    private SwipeRefreshLayout mSwipeRefresh;

// ..


    LocationRequest mRequest = LocationRequest.create();

    private FirebaseAuth mAuth;
// ...





    HomeFragment homeFragment = new HomeFragment();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(com.lunchdaxuf.theod.myapplication.R.layout.activity_main);
        //mTextMessage = (TextView) findViewById(R.id.message);

        BottomNavigationView bottomNav = findViewById(com.lunchdaxuf.theod.myapplication.R.id.bottom_navigation);
        bottomNav.setOnNavigationItemSelectedListener(navListener);

        mRequest = new LocationRequest();
        mRequest.setNumUpdates(1);
        mRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);

        mSwipeRefresh = findViewById(com.lunchdaxuf.theod.myapplication.R.id.swiperefresh);

        mSwipeRefresh.setOnRefreshListener(
                new SwipeRefreshLayout.OnRefreshListener() {
                    @Override
                    public void onRefresh() {
                        checkPlayServices();
                    }
                }
        );


        getSupportFragmentManager()
                .beginTransaction()
                .replace(com.lunchdaxuf.theod.myapplication.R.id.fragment_container, homeFragment).commit();


        mFusedLocationClient = getFusedLocationProviderClient(this);

        if (needsPermissions()) requestPermissions();
        else                    checkPlayServices();


        // Initialize Firebase Auth
        mAuth = FirebaseAuth.getInstance();
        mAuth.signInAnonymously()
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d("a", "signInAnonymously:success");
                            FirebaseUser user = mAuth.getCurrentUser();
                            //updateUI(user);
                        } else {
                            // If sign in fails, display a message to the user.
                            Log.w("a", "signInAnonymously:failure", task.getException());
                            Toast.makeText(MainActivity.this, "Authentication failed.",
                                    Toast.LENGTH_SHORT).show();
                            //updateUI(null);
                        }

                        // ...
                    }
                });
    }

    @Override
    public void onStart() {
        super.onStart();
        // Check if user is signed in (non-null) and update UI accordingly.
        FirebaseUser currentUser = mAuth.getCurrentUser();
        //updateUI(currentUser);
    }






    public void getClosestCity(){
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        db.collection("cities")
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if(task.isSuccessful()) {
                            double shortDist = 15000;
                            String cityId = "";

                            for (QueryDocumentSnapshot document : requireNonNull(task.getResult())) {
                                double lat = requireNonNull(document.getDouble("lat"));
                                double lon = requireNonNull(document.getDouble("lon"));

                                if (tryRange(lat, lon, 15000)) {
                                    double d = aproxDistance(lat, lon);
                                    if (d < shortDist) {
                                        shortDist = d;
                                        cityId = document.getId();
                                    }
                                }
                            }

                            if (!cityId.equals("")) {
                                if (timeToRefresh() || !cityId.equals(lastCityId)) {
                                    lastCityId = cityId;
                                    getDishes(cityId);
                                } else updateDistances();
                            }
                        }
                    }
                });
    }


    public static long lastTime = 0;

    public boolean timeToRefresh(){
        Date date = new Date();
        long timeNow = date.getTime();
        long difference = timeNow - lastTime;
        if(difference > 60*30*1000){ //30minutes
            lastTime = date.getTime();
            return true;
        }
        else return false;
    }

    @SuppressLint("MissingPermission")
    void updateDistances(){

        mFusedLocationClient.getLastLocation()
                .addOnCompleteListener(new OnCompleteListener<Location>() {
                    @Override
                    public void onComplete(@NonNull Task<Location> task) {
                        if(task.isSuccessful() && task.getResult()!=null) {
                            userLat = task.getResult().getLatitude();
                            userLong = task.getResult().getLongitude();
                            for(int i = 0; i < dishList.size();i++){
                                double a = userLat;
                                Dish dish = dishList.get(i);
                                double lat = dish.getLatitude();
                                double lon = dish.getLongitude();
                                int d = (int)aproxDistance(lat, lon);
                                dishList.get(i).setDistance(d);
                            }
                            setDishes();
                        }
                        else Log.d("GPS", valueOf(task.getException()));
                    }
                });



    }

    public void getDishes(String id) {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        CollectionReference ref = db.collection("cities").document(id).collection("restaurants");

        ref.get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                dishList.clear();
                for(QueryDocumentSnapshot doc : requireNonNull(task.getResult())){

                    Map<String, Object> a = doc.getData();
                    double lat = requireNonNull(doc.getDouble("lat"));
                    double lon = requireNonNull(doc.getDouble("lon"));
                    float rating = requireNonNull(doc.getDouble("rating")).floatValue();
                    String address = requireNonNull(doc.getString("address"));


                    String restName = (String) doc.get("name");

                    ArrayList dishes = (ArrayList) a.get("dishes");

                    if(dishes != null) {
                        for (int i = 0; i < dishes.size(); i++) {
                            Map dish = (Map) dishes.get(i);
                            String desc = (String) dish.get("description");
                            String name = (String) dish.get("name");
                            String price = (String) dish.get("price");


                            //Dish
                            Dish newDish = new Dish();
                            newDish.setDish(name);
                            newDish.setDescription(desc);
                            newDish.setPrice(price);

                            //Rest
                            newDish.setDistance((int) aproxDistance(lat, lon));
                            newDish.setImageURL((String) dish.get("image_url"));
                            newDish.setRest_imageURL((String) doc.get("image_url"));

                            newDish.setName(restName);
                            newDish.setLatitude(lat);
                            newDish.setLongitude(lon);
                            newDish.setRating(rating);
                            newDish.setAddress(address);
                            ArrayList ObjDays = (ArrayList) dish.get("days");

                            for (Object day:ObjDays) {
                                String string = day.toString();
                                if(string.equals("true")){
                                    day = true;
                                }
                                else{ day = false; }
                            }
                            Log.d("hallå", ObjDays.get(0).toString());
                            newDish.setDays((Boolean[]) ObjDays.toArray(new Boolean[ObjDays.size()]));


                            Log.d("hallå", String.valueOf(Calendar.getInstance().get(Calendar.DAY_OF_WEEK)-1));

                            if(newDish.getDays()[Calendar.getInstance().get(Calendar.DAY_OF_WEEK)-1]){
                                dishList.add(newDish);
                            }
                        }
                    }
                }
                if(dishList.size() == 0) return;
                setDishes();
            }
        });
    }

    public void setDishes()
    {
        mSwipeRefresh.setRefreshing(false);
        //adapter = new DishAdapter(getApplicationContext(), dishList);
        sortDishesByDistance();
        homeFragment.adapter.notifyDataSetChanged();
        //mList.setAdapter(adapter);
    }

    public void sortDishesByDistance(){
        Collections.sort(dishList, new Comparator<Dish>() {
            @Override
            public int compare(Dish o1, Dish o2) {
                return Integer.compare(o1.getDistance(), o2.getDistance());
            }
        });
    }



    @Override
    public void onRequestPermissionsResult(int requestCode, String[] Permissions, int[] grantResults){

        //getPackageManager();
        int granted = PackageManager.PERMISSION_GRANTED;

        for (int result: grantResults) {
            if (result != granted) return;
        }

        startProcess();

    }


    private LocationCallback mCallback = new LocationCallback();
    @SuppressLint("MissingPermission")
    public void startProcess()
    {
        mSwipeRefresh.setRefreshing(true);

        mFusedLocationClient.getLastLocation()
                .addOnCompleteListener(new OnCompleteListener<Location>() {
                    @Override
                    public void onComplete(@NonNull Task<Location> task) {
                         if(task.isSuccessful() && task.getResult()!=null) {
                             userLat = task.getResult().getLatitude();
                             userLong = task.getResult().getLongitude();
                             getClosestCity();
                         }
                         else Log.d("GPS", valueOf(task.getException()));
                    }
                });
    }

    private boolean checkPlayServices() {
        GoogleApiAvailability apiAvailability = GoogleApiAvailability.getInstance();
        int resultCode = apiAvailability.isGooglePlayServicesAvailable(this);

        if (resultCode != ConnectionResult.SUCCESS) {
            if (apiAvailability.isUserResolvableError(resultCode)) {
                apiAvailability.getErrorDialog(this, resultCode, 10);
            } else {
            }

            return false;
        }
        startProcess();

        return true;
    }








    //Distance functions
    double aproxDistance(double lat, double lon)
    {
        double x = toRadians(lon - userLong) * cos(toRadians(lat+userLat)/2);
        double y = toRadians(lat - userLat);

        return 6372795.477598 * sqrt(x*x + y*y);
    }
    private int exactDistance(double lat1, double lon1){
        double lat2 = MainActivity.userLat;
        double lon2 = MainActivity.userLong;
        double rad = Math.PI/180;

        return (int)Math.round(acos(sin(lat2*rad)*sin(lat1*rad)+cos(lat2*rad)*cos(lat1*rad)*cos(lon2*rad-lon1*rad))*6372.795477598*1000);
    }

    boolean tryRange(double lat, double lon, double range){

        double rangeDegree = range/111000;
        double deltaLat = abs(lat-userLat);
        double deltaLong = abs(lon-userLong);

        return (deltaLat<rangeDegree && deltaLong<rangeDegree);
    }




    private boolean needsPermissions() {

        int granted = PackageManager.PERMISSION_GRANTED;

        return (ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION)   != granted ||
                ContextCompat.checkSelfPermission(this,
                        Manifest.permission.ACCESS_COARSE_LOCATION) != granted ||
                ContextCompat.checkSelfPermission(this,
                        Manifest.permission.INTERNET)               != granted ||
                ContextCompat.checkSelfPermission(this,
                        Manifest.permission.ACCESS_NETWORK_STATE)   != granted);
    }

    private void requestPermissions() {
        String permissions[] = new String[]{
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.INTERNET,
                Manifest.permission.ACCESS_NETWORK_STATE};

        ActivityCompat.requestPermissions(this, permissions, 5);
    }


    //menu binding

    private BottomNavigationView.OnNavigationItemSelectedListener navListener =
            new BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                    Fragment selectedFragment = null;
                    switch (menuItem.getItemId()){
                        case com.lunchdaxuf.theod.myapplication.R.id.nav_home:
                            selectedFragment = new HomeFragment();
                            break;
                        //case R.id.nav_favorites:
                            //selectedFragment = new FavoritesFragment();
                            //break;
                        case com.lunchdaxuf.theod.myapplication.R.id.nav_settings:
                            selectedFragment = new SettingsFragment();
                            break;
                    }
                    assert selectedFragment != null;
                    getSupportFragmentManager()
                            .beginTransaction()
                            .replace(com.lunchdaxuf.theod.myapplication.R.id.fragment_container, selectedFragment).commit();
                    return true;
                }
            };


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == com.lunchdaxuf.theod.myapplication.R.id.pressRefresh) {
            invalidateOptionsMenu();
            startProcess();
            return true;
        }
        return false;
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(com.lunchdaxuf.theod.myapplication.R.menu.menu_refresh, menu);

        return true;
    }



}
