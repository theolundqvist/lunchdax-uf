package com.example.theod.myapplication;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.List;

import static java.lang.String.valueOf;


public class DishAdapter extends RecyclerView.Adapter<DishAdapter.ViewHolder>{

    final Context context;
    List<Dish> dishes;
    private ViewHolder viewHolderInstance;

    public DishAdapter(Context context, List<Dish> list){
        this.context = context;
        this.dishes = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context).inflate(com.lunchdaxuf.theod.myapplication.R.layout.row_item, parent, false);
        return new ViewHolder(v);

    }


    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int index) {
        Dish dish = dishes.get(index);


        //Restaurant
        holder.textRestaurant.setText(dish.getName());
        holder.textRating.setRating(dish.getRating());
        //holder.textDistance.setText(dish.getDistance());


        //Dish
        holder.textDescription.setText(dish.getDescription());
        holder.textDish.setText(dish.getDish());
        holder.textPrice.setText(valueOf(dish.getPrice()) + ":-");


        int d = dishes.get(index).getDistance();
        String text;
        if(d > 1000) text = valueOf(Math.round(d/100f)/10f) + "km";
        else if(d > 100) text = valueOf(Math.round((double)d/50f)*50) + "m";
        else text = valueOf(Math.round(d)) + "m";
        holder.textDistance.setText(text);


        String url = "https://lunchdaxuf.se/images/placeholder.png";
        if(!"".equals(dish.rest_imageURL) && dish.rest_imageURL != null) url = dish.getRest_imageURL();
        if(!"".equals(dish.imageURL) && dish.imageURL != null) url = dish.getImageURL();



        Picasso.get()
                .load(url)
                .resize(480, 480)
                .centerCrop()
                .into(holder.imageView);


        viewHolderInstance = holder;
        holder.dishId = index;

    }

    @Override
    public int getItemCount() {
        return dishes.size();
    }

    final class ViewHolder extends RecyclerView.ViewHolder {
        TextView textDish, textPrice, textDescription, textDistance, textRestaurant;
        RatingBar textRating;
        ImageView imageView;
        int dishId;

        Button btnDirections;

        ViewHolder(View itemView){
            super(itemView);

            //Dish
            textDish = itemView.findViewById(com.lunchdaxuf.theod.myapplication.R.id.dish_name);
            textDescription = itemView.findViewById(com.lunchdaxuf.theod.myapplication.R.id.dish_description);
            textPrice = itemView.findViewById(com.lunchdaxuf.theod.myapplication.R.id.dish_price);
            imageView = itemView.findViewById(com.lunchdaxuf.theod.myapplication.R.id.dish_picture);

            //Restaurant
            textRestaurant = itemView.findViewById(com.lunchdaxuf.theod.myapplication.R.id.rest_name);
            textDistance = itemView.findViewById(com.lunchdaxuf.theod.myapplication.R.id.rest_distance);
            textRating = itemView.findViewById(com.lunchdaxuf.theod.myapplication.R.id.rest_rating);
            btnDirections = itemView.findViewById(com.lunchdaxuf.theod.myapplication.R.id.button2);

            btnDirections.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Dish dish = dishes.get(dishId);
                    Uri intentUri= Uri.parse("geo:"+ dish.getLatitude()+",+"+dish.getLongitude()+"?q="+Uri.encode(dish.getName()));
                    Intent mapIntent = new Intent(Intent.ACTION_VIEW, intentUri);


                    mapIntent.setPackage("com.google.android.apps.maps");
                    mapIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

                    context.startActivity(mapIntent);

                }
            });
        }
    }

}
