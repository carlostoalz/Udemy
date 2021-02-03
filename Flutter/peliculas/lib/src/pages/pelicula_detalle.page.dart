import 'package:flutter/material.dart';
import 'package:peliculas/src/models/actor.model.dart';
import 'package:peliculas/src/models/pelicula.model.dart';
import 'package:peliculas/src/providers/peliculas.provider.dart';

class PeliculaDetalle extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Pelicula pelicula = ModalRoute.of(context).settings.arguments;
    return Scaffold(
      body: Center(
        child: CustomScrollView(
          slivers: [
            _crearAppbar(pelicula),
            SliverList(
              delegate: SliverChildListDelegate([
                SizedBox(
                  height: 10.0,
                ),
                _posterTitulo(context, pelicula),
                _descripcion(pelicula),
                _crearCasting(pelicula),
              ]),
            ),
          ],
        ),
      ),
    );
  }

  Widget _crearAppbar(Pelicula pelicula) => SliverAppBar(
        elevation: 2.0,
        backgroundColor: Colors.indigoAccent,
        expandedHeight: 200.0,
        floating: false,
        pinned: true,
        flexibleSpace: FlexibleSpaceBar(
          centerTitle: true,
          title: Text(
            pelicula.title,
            style: TextStyle(color: Colors.white, fontSize: 16.0),
          ),
          background: FadeInImage(
            image: NetworkImage(pelicula.getBackdropPath()),
            placeholder: AssetImage('assets/img/loading.gif'),
            fadeInDuration: Duration(milliseconds: 150),
            fit: BoxFit.cover,
          ),
        ),
      );

  Widget _posterTitulo(BuildContext context, Pelicula pelicula) => Container(
        padding: EdgeInsets.symmetric(horizontal: 20.0),
        child: Row(
          children: [
            Hero(
              tag: pelicula.uniqueId,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20.0),
                child: Image(
                  image: NetworkImage(pelicula.getPosterImg()),
                  height: 150.0,
                ),
              ),
            ),
            SizedBox(
              width: 20.0,
            ),
            Flexible(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    pelicula.title,
                    style: Theme.of(context).textTheme.headline6,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Text(
                    pelicula.originalTitle,
                    style: Theme.of(context).textTheme.subtitle1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Row(
                    children: [
                      Icon(Icons.star_border),
                      Text(
                        pelicula.voteAverage.toString(),
                        style: Theme.of(context).textTheme.subtitle1,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      );

  Widget _descripcion(Pelicula pelicula) => Container(
        padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 20.0),
        child: Text(
          pelicula.overview,
          textAlign: TextAlign.justify,
        ),
      );

  Widget _crearCasting(Pelicula pelicula) {
    final PeliculasProvider peliProvider = new PeliculasProvider();
    return FutureBuilder(
      future: peliProvider.getCast(pelicula.id.toString()),
      builder: (BuildContext context, AsyncSnapshot<List<Actor>> snapshot) =>
          snapshot.hasData
              ? _crearActoresPageView(snapshot.data)
              : Center(
                  child: CircularProgressIndicator(),
                ),
    );
  }

  Widget _crearActoresPageView(List<Actor> actores) => SizedBox(
        height: 200.0,
        child: PageView.builder(
          pageSnapping: false,
          controller: PageController(
            viewportFraction: 0.3,
            initialPage: 1,
          ),
          itemCount: actores.length,
          itemBuilder: (context, index) => _actorTajeta(actores[index]),
        ),
      );

  Widget _actorTajeta(Actor actor) => Container(
        child: Column(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(20.0),
              child: FadeInImage(
                image: NetworkImage(actor.getFoto()),
                placeholder: AssetImage('assets/img/no-image.jpg'),
                height: 150.0,
                fit: BoxFit.cover,
              ),
            ),
            Text(
              actor.name,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      );
}
