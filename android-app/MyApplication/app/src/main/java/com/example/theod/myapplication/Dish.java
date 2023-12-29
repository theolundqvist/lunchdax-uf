package com.example.theod.myapplication;

public class Dish {

    //Restaurant info
    private String name;
    private float rating;
    private double latitude;
    private double longitude;
    private String address;
    public String rest_imageURL = "";



    private int distance = 0;
    //Dish info
    private String dish;
    private String price;
    private int dayServed;
    private String description;
    public String imageURL = "";
    private Boolean days[];




    public Dish(String name, float rating, double latitude, double longitude, String price, String dish, String description, int dayServed)
    {
        this.name = name;
        this.rating = rating;
        this.latitude = latitude;
        this.longitude = longitude;

        this.price = price;
        this.dayServed = dayServed;
        this.description = description;
        this.dish = dish;
    }
    public Dish(){};

    //region Get Set
    public String getName() {
        return name;
    }

    public float getRating() {
        return rating;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public String getDish() {
        return dish;
    }

    public String getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public int getDayServed() {
        return dayServed;
    }

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setDish(String dish) {
        this.dish = dish;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDayServed(int dayServed) {
        this.dayServed = dayServed;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean[] getDays() {
        return days;
    }

    public void setDays(Boolean[] days) {
        this.days = days;
    }

    public String getRest_imageURL() {
        return rest_imageURL;
    }

    public void setRest_imageURL(String rest_imageURL) {
        this.rest_imageURL = rest_imageURL;
    }
//endregion
}
