


import 'package:flutter/material.dart';
import 'package:lunchdax/utils.dart';

class MapButton extends StatefulWidget {
  MapButton({Key key}) : super(key: key);
  _MapButtonState createState() => _MapButtonState();
}

class _MapButtonState extends State<MapButton> {
  double shadowValue = -2.0;

  void _press() {
    print("tapped on container");
    shadowValue = -9;
    setState(() {});
    //Open maps
    Future.delayed(Duration(milliseconds: 200), () {
      setState(() {
        shadowValue = -2;
      });
    });
  }

  @override
  Widget build(BuildContext c) {
    return InkWell(
      child: new Container(
        //duration: Duration(milliseconds: 100),
        padding: new EdgeInsets.all(6),
        decoration: BoxDecoration(
            color: AppColors.secondary,
            borderRadius: boxRadius(0.0, 0.0, 0.0, 4.0),
            boxShadow: [
              new BoxShadow(
                color: Colors.black87,
                blurRadius: 10.0,
                offset: Offset(0.0, 0.0),
                spreadRadius: shadowValue,
              )
            ]),
        child: Icon(
          Icons.pin_drop,
          size: scale(26, c),
        ),
      ),
      onLongPress: () {
        _press();
      },
      onTap: () {
        _press();
      },
    );
  }
}