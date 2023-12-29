import 'dart:core';
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';

double baseWidth = 360.0;

double scale(double size, BuildContext context) {
  return size * MediaQuery.of(context).size.width / 360;
}

class AppColors {
  static const Color primary = Color(0xff009ee2);
  static const Color secondary = Color(0xFF35A8E0);
  static const Color dark = Color(0xff575756);
  static const MaterialColor swatch = MaterialColor(0xff009ee2, {
            50: Color.fromRGBO(0, 158, 226, 0.1),
            100: Color.fromRGBO(0, 158, 226, 0.2),
            200: Color.fromRGBO(0, 158, 226, 0.3),
            300: Color.fromRGBO(0, 158, 226, 0.4),
            400: Color.fromRGBO(0, 158, 226, 0.5),
            500: Color.fromRGBO(0, 158, 226, 0.6),
            600: Color.fromRGBO(0, 158, 226, 0.7),
            700: Color.fromRGBO(0, 158, 226, 0.8),
            800: Color.fromRGBO(0, 158, 226, 0.9),
            900: Color.fromRGBO(0, 158, 226, 1)
          });
}

dynamic label(String text, double size, int weight, BuildContext c, [double minFontSize, int maxLines, TextAlign textAlign]) {
  FontWeight w;
  switch (weight) {
    case 100:
      w = FontWeight.w100;
      break;
    case 200:
      w = FontWeight.w200;
      break;
    case 300:
      w = FontWeight.w300;
      break;
    case 500:
      w = FontWeight.w500;
      break;
    case 600:
      w = FontWeight.w600;
      break;
    case 700:
      w = FontWeight.w700;
      break;
    case 800:
      w = FontWeight.w800;
      break;
    case 900:
      w = FontWeight.w900;
      break;
  }
  TextStyle style = new TextStyle(
        fontSize: scale(size, c),
        fontFamily: (size > 20) ? 'SF-display' : 'SF-text',
        fontWeight: w,
      );

  if(maxLines != null){
    
    return AutoSizeText(text, overflow: TextOverflow.ellipsis,
      style: style,
      minFontSize: scale(minFontSize, c),
      maxLines: maxLines,
      textAlign: textAlign,
    );
  }

  return new Text(text,
      overflow: TextOverflow.ellipsis,
      style: style,
      textAlign: textAlign,
  );
}

BorderRadius boxRadius(
    double topLeft, double topRight, double bottomLeft, double bottomRight) {
  return new BorderRadius.only(
      topLeft: Radius.circular(topLeft),
      topRight: Radius.circular(topRight),
      bottomLeft: Radius.circular(bottomLeft),
      bottomRight: Radius.circular(bottomRight));
}
