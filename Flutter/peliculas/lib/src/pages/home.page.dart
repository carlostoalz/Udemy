import 'package:flutter/material.dart';
import 'package:peliculas/src/delegates/search.delegate.dart';
import 'package:peliculas/src/providers/peliculas.provider.dart';
import 'package:peliculas/src/widgets/card_swiper.widget.dart';
import 'package:peliculas/src/widgets/horizontal_slider.widget.dart';

class HomePage extends StatelessWidget {
  final PeliculasProvider peliculasProvider = new PeliculasProvider();

  @override
  Widget build(BuildContext context) {
    peliculasProvider.getPopulares();
    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        title: Text('Peliculas en cines'),
        backgroundColor: Colors.indigoAccent,
        actions: [
          IconButton(
            icon: Icon(Icons.search),
            onPressed: () {
              showSearch(context: context, delegate: DataSearch());
            },
          )
        ],
      ),
      body: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _swiperTarjetas(),
            _horizontalSlider(context),
          ],
        ),
      ),
    );
  }

  Widget _swiperTarjetas() => FutureBuilder(
      future: peliculasProvider.getEnCines(),
      builder: (BuildContext context, AsyncSnapshot<List> snapshot) {
        if (snapshot.hasData)
          return CardSwiper(peliculas: snapshot.data);
        else
          return Container(
            height: 400.0,
            child: Center(
              child: CircularProgressIndicator(),
            ),
          );
      });

  Widget _horizontalSlider(BuildContext context) => Container(
        width: double.infinity,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.only(left: 20.0),
              child: Text(
                'Populares',
                style: Theme.of(context).textTheme.subtitle1,
              ),
            ),
            SizedBox(
              height: 5.0,
            ),
            StreamBuilder(
              stream: peliculasProvider.popularesStream,
              builder: (BuildContext context, AsyncSnapshot<List> snapshot) =>
                  snapshot.hasData
                      ? HorizontalSlider(
                          peliculas: snapshot.data,
                          siguientePagina: peliculasProvider.getPopulares,
                        )
                      : Center(child: CircularProgressIndicator()),
            ),
          ],
        ),
      );
}
