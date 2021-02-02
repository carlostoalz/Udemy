import 'package:flutter/material.dart';
import 'dart:async';

class ListaPage extends StatefulWidget {
  @override
  _ListaPageState createState() => _ListaPageState();
}

class _ListaPageState extends State<ListaPage> {
  List<int> _numeros = new List<int>();
  int _ultimoItem = 0;
  bool _isLoading = false;
  ScrollController _scrollController = new ScrollController();

  @override
  void initState() {
    super.initState();
    this._agregar10();
    this._scrollController.addListener(() {
      if (this._scrollController.position.pixels ==
          this._scrollController.position.maxScrollExtent) {
        this._fetchData();
      }
    });
  }

  @override
  void dispose() {
    super.dispose();
    this._scrollController.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text('Listas'),
        ),
        body: Stack(
          children: [this._crearLista(), this.crearLoading()],
        ),
      );

  Widget _crearLista() {
    return RefreshIndicator(
      child: ListView.builder(
        controller: this._scrollController,
        itemCount: _numeros.length,
        itemBuilder: (context, index) {
          final imagen = _numeros[index];

          return FadeInImage(
            image: NetworkImage('https://picsum.photos/500/300/?image=$imagen'),
            placeholder: AssetImage('assets/jar-loading.gif'),
          );
        },
      ),
      onRefresh: this._obtenerPagina1,
    );
  }

  Future<void> _obtenerPagina1() async {
    final duration = new Duration(seconds: 2);
    new Timer(duration, () {
      setState(() {
        this._numeros.clear();
        this._ultimoItem++;
        this._agregar10();
      });
    });

    return Future.delayed(duration);
  }

  void _agregar10() => setState(() {
        for (var i = 1; i < 10; i++) {
          this._ultimoItem++;
          this._numeros.add(this._ultimoItem);
        }
      });

  Future<Null> _fetchData() async {
    setState(() => this._isLoading = true);

    final duracion = new Duration(seconds: 2);
    return new Timer(duracion, this._respuestaHTTP);
  }

  void _respuestaHTTP() {
    this._isLoading = false;
    this._agregar10();
    this._scrollController.animateTo(
          this._scrollController.position.pixels + 100,
          curve: Curves.fastOutSlowIn,
          duration: Duration(milliseconds: 250),
        );
  }

  Widget crearLoading() {
    return this._isLoading
        ? Column(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircularProgressIndicator(),
                ],
              ),
              SizedBox(
                height: 15.0,
              ),
            ],
          )
        : Container();
  }
}
