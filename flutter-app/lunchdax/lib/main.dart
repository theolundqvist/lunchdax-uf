import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:lunchdax/ui/loadingAnimation.dart';
import 'package:lunchdax/ui/requestLocation.dart';
import 'ui/cardRow.dart';
import 'utils.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODåpö<O: implement build
    return MaterialApp(
        title: 'Band Name servey',
        theme: ThemeData(
          primarySwatch: AppColors.swatch,
        ),
        home: const MyHomePage(title: 'Possible Band Names'));
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext c) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: label("Lunchdax", 32, 600, c),
        actions: <Widget>[
          IconButton(
              icon: Icon(Icons.refresh),
              iconSize: scale(32, c),
              tooltip: 'Uppdatera',
              onPressed: () {
                print("uppdatera");
              }),
        ],
      ),
      body: requestLocationPage(c)
    );
  }
}
