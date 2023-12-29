import 'package:flutter/material.dart';
import 'package:lunchdax/utils.dart';
import 'package:shimmer/shimmer.dart';

double screenWidth;

Widget animatedLoadingScreen(BuildContext c) {
  screenWidth = MediaQuery.of(c).size.width;

  return Container(
    width: double.infinity,
    child: ListView.builder(
      itemCount: 5,
      shrinkWrap: true,
      itemBuilder:(c,index)=>
      new Container(
                child: new Card(
                  color: Colors.grey[200],
                  child: Shimmer.fromColors(
                    baseColor: Colors.grey[300],
                    highlightColor: Colors.grey[200],
                    child: new Column(
                      children: <Widget>[topRow(c), bottomRow(c)],
                    ),
                  ),
                ),
                margin: EdgeInsets.only(bottom: 4.0),
              )
    ),
  );
}

Widget shimmerBox(
    {double height,
    double width,
    Alignment alignment,
    EdgeInsetsGeometry padding,
    BorderRadiusGeometry radius}) {
  return Container(
      padding: padding,
      child: Container(
          decoration: BoxDecoration(color: Colors.black, borderRadius: radius),
          alignment: alignment,
          width: width,
          height: height));
}

Widget topRow(BuildContext c) {
  return Row(
    children: <Widget>[
      shimmerBox(
        width: screenWidth * 0.375,
        height: screenWidth * 0.375,
        radius: boxRadius(4, 0, 0, 0)
      ),
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
                      shimmerBox(
                        alignment: Alignment.centerLeft,
                        width: screenWidth * 0.250,
                        height: scale(25, c),
                      ),
                      shimmerBox(
                          alignment: Alignment.centerRight,
                          width: screenWidth * 0.15,
                          height: scale(25, c))
                    ],
                  ),
                ),
                shimmerBox(
                    height: scale(20, c),
                    width: screenWidth * 0.5,
                    alignment: Alignment.center,
                    padding: EdgeInsets.only(top: 14)),
                shimmerBox(
                    height: scale(20, c),
                    width: screenWidth * 0.5,
                    alignment: Alignment.center,
                    padding: EdgeInsets.only(top: 8)),
                shimmerBox(
                    height: scale(20, c),
                    width: screenWidth * 0.3,
                    alignment: Alignment.center,
                    padding: EdgeInsets.only(top: 8)),
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
          child: shimmerBox(height: scale(30, c), width: double.infinity,radius: boxRadius(0, 0, 4, 4)),
        ),
      ]);
}
