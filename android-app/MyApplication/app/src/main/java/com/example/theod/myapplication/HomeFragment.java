package com.example.theod.myapplication;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import static com.example.theod.myapplication.MainActivity.dishList;

public class HomeFragment extends Fragment {

    private RecyclerView mList;
    private LinearLayoutManager linearLayoutManager;
    private DividerItemDecoration dividerItemDecoration;
    public RecyclerView.Adapter adapter;


    public Bundle savedState = null;
    private Context context;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View v = inflater.inflate(com.lunchdaxuf.theod.myapplication.R.layout.fragment_home, null);
        mList = v.findViewById(com.lunchdaxuf.theod.myapplication.R.id.main_list);
        declareList();

        return v;
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        context = activity.getBaseContext();

    }

    public void declareList(){
        adapter = new DishAdapter(context, dishList);
        linearLayoutManager = new LinearLayoutManager(context);
        linearLayoutManager.setOrientation(LinearLayoutManager.VERTICAL);
        dividerItemDecoration = new DividerItemDecoration(context,linearLayoutManager.getOrientation());

        adapter = new DishAdapter(context, dishList);
        mList.setAdapter(adapter);
        mList.setLayoutManager(linearLayoutManager);


    }

    @Override
    public void onResume() {
        super.onResume();
        adapter.notifyDataSetChanged();
    }



    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);

        ///outState.putBundle("mList", (savedState != null) ? savedState : saveState());
    }


}
