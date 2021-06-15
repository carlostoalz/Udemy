import 'package:flutter/material.dart';
import 'package:disenos/src/pages/basico.page.dart';

void main() => runApp(DisenosApp());

class DisenosApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Diseños',
      initialRoute: 'basico',
      routes: {
        'basico': (BuildContext context) => BasicoPage(),
      },
    );
  }
}
