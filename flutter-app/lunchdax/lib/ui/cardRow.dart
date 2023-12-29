import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:lunchdax/ui/cardMapButton.dart';
import 'package:lunchdax/utils.dart';

double screenWidth;

Widget cardRow(BuildContext c, DocumentSnapshot doc) {
  screenWidth = MediaQuery.of(c).size.width;

  return new Container(
    child: new Card(
      child: new Column(
        children: <Widget>[topRow(c), bottomRow(c)],
      ),
    ),
    decoration: new BoxDecoration(boxShadow: [
      new BoxShadow(
        color: Colors.black87,
        blurRadius: 10.0,
        offset: Offset(0.0, 0.0),
        spreadRadius: -5.0,
      )
    ]),
    margin: EdgeInsets.only(bottom: 4.0),
  );
}

Widget topRow(BuildContext c) {
  return Row(
    children: <Widget>[
      Container(
        decoration: BoxDecoration(
            borderRadius: boxRadius(4.0, 0.0, 0.0, 0.0)),
        width: screenWidth * 0.375,
        height: screenWidth * 0.375,
        child: Image.network(
            'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
            fit: BoxFit.fill),
      ), //Image
      Expanded(
        child: Container(
            padding: EdgeInsets.all(6),
            height: screenWidth * 0.375,
            child: Column(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                Container(
                  padding: EdgeInsets.only(bottom: 6),
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        alignment: Alignment.centerLeft,
                        width: screenWidth * 0.375,
                        height: scale(36, c),
                        child: label('Buffé', 26, 500, c, 20, 1),
                      ),
                      Container(
                        alignment: Alignment.centerRight,
                        width: screenWidth * 0.2,
                        height: scale(36, c),
                        child: label('89kr', 26, 400, c),
                      ),
                    ],
                  ),
                ),
                Container(
                    height: screenWidth * 0.23125,
                    child: label(
                        "I'd like to know how to center the contents a Text widget vertically and horizontally in Flutter. I only know how to center the widget itself using",
                        22,
                        200,
                        c,
                        17,
                        4, TextAlign.center))
              ],
            )),
      ),
    ],
  );
}

Widget bottomRow(BuildContext c) {
  return new Row(
      textBaseline: TextBaseline.alphabetic,
      mainAxisSize: MainAxisSize.max,
      children: <Widget>[
        Expanded(
            child: new Container(
          decoration: new BoxDecoration(
              color: AppColors.primary, borderRadius: boxRadius(0.0, 0.0, 4.0, 4.0)),
          padding: new EdgeInsets.all(0),
          child: new Row(
            textBaseline: TextBaseline.alphabetic,
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Container(
                  padding: new EdgeInsets.only(left: 8),
                  width: screenWidth * 0.375,
                  alignment: Alignment.centerLeft,
                  height: scale(32, c),
                  child: label('Magasinet', 26, 400, c, 18, 1)),
              new Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    Icon(
                      Icons.star,
                      size: scale(26, c),
                      color: Colors.yellow,
                    ),
                    label(' 4.5 ', 22, 400, c),
                  ]),
              label(' 900m', 22.0, 400, c),
              MapButton()
            ],
          ),
        )),
      ]);
}
