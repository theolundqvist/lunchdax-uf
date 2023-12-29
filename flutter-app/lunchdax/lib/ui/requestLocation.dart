import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:lunchdax/ui/cardMapButton.dart';
import 'package:lunchdax/utils.dart';

double screenWidth;

Widget requestLocationPage(BuildContext c) {
  screenWidth = MediaQuery.of(c).size.width;

  return Column(
    children: <Widget>[
      DecoratedBox(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/gpstransparent.png'),
          )
        ),
        child: SizedBox(
          width: double.infinity,
          height: scale(300,c),
        ),
      ),
      Padding(child: label("Med platsåtkomst kan vi automatiskt hitta luncher nära dig.", 24, 300, c, 26, 10, TextAlign.center),
      padding: EdgeInsets.symmetric(vertical: 12)),
      
      RaisedButton(
        padding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
        color: AppColors.primary,
        textColor: Colors.white,
        child: label("Tillåt platsanvänding", 26, 600, c),
        onPressed: () {
          
        },
      ),
      Padding(padding: EdgeInsets.symmetric(vertical: 2)),
      RaisedButton(
        padding: EdgeInsets.symmetric(vertical: 4, horizontal: 10),
        color: AppColors.dark,
        textColor: Colors.white,
        child: label("Tillåt ej", 20, 300, c),
        onPressed: () {
          
        },
      ),
    ],
  );
}