import 'package:flutter/material.dart';
import 'package:peliculas/src/pages/home.page.dart';
import 'package:peliculas/src/pages/pelicula_detalle.page.dart';

void main() => runApp(PeliculasApp());

class PeliculasApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Películas',
      initialRoute: '/',
      routes: {
        '/': (BuildContext context) => HomePage(),
        'detalle': (BuildContext context) => PeliculaDetalle(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
