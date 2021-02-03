import 'package:flutter/material.dart';
import 'package:peliculas/src/models/pelicula.model.dart';
import 'package:peliculas/src/providers/peliculas.provider.dart';

class DataSearch extends SearchDelegate {
  String seleccion = '';
  final PeliculasProvider peliculasProvider = new PeliculasProvider();

  final peliculas = [
    'Spiderman',
    'Aquaman',
    'Batman',
    'Flash',
    'Blak Panter',
    'The Croods',
    'Buscando a Dorí',
    'Son como niños',
    'Shazam!',
    'Ironman',
  ];
  final peliculasRecientes = [
    'Spiderman',
    'Capitán América',
  ];

  @override
  List<Widget> buildActions(BuildContext context) {
    // Las acciones de nuestro AppBar
    return [
      IconButton(
        icon: Icon(Icons.clear),
        onPressed: () => query = '',
      ),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    // Icono a la izquierda del AppBar
    return IconButton(
      icon: AnimatedIcon(
        icon: AnimatedIcons.menu_arrow,
        progress: transitionAnimation,
      ),
      onPressed: () => close(context, null),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    // Crea los resultados que vamos a mostrar
    return Container();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    // Son las sugerencias que aparecen cuando la persona escribe

    if (query.isEmpty) return Container();

    return FutureBuilder(
      future: peliculasProvider.buscarPelicula(query),
      builder: (BuildContext context, AsyncSnapshot<List<Pelicula>> snapshot) =>
          snapshot.hasData
              ? ListView(
                  children: snapshot.data
                      .map((pelicula) => ListTile(
                            leading: FadeInImage(
                              image: NetworkImage(pelicula.getPosterImg()),
                              placeholder:
                                  AssetImage('assets/img/no-image.jpg'),
                              width: 50.0,
                              fit: BoxFit.contain,
                            ),
                            title: Text(pelicula.title),
                            subtitle: Text(pelicula.originalTitle),
                            onTap: () {
                              close(context, null);
                              pelicula.uniqueId = '${pelicula.id}-busqueda';
                              Navigator.pushNamed(context, 'detalle',
                                  arguments: pelicula);
                            },
                          ))
                      .toList(),
                )
              : Center(
                  child: CircularProgressIndicator(),
                ),
    );
  }
}
