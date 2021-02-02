import 'package:flutter/material.dart';
import 'package:componentes/src/providers/menu.provider.dart';
import 'package:componentes/src/utils/icono_string.util.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Componentes'),
      ),
      body: _lista(),
    );
  }

  Widget _lista() => FutureBuilder(
        future: menuProvider.cargarData(),
        initialData: [],
        builder: (context, AsyncSnapshot<List<dynamic>> snapshot) => ListView(
          children: _listaItems(context, snapshot.data),
        ),
      );

  List<Widget> _listaItems(BuildContext context, List<dynamic> data) {
    final List<Widget> opciones = [];

    data.forEach((opt) {
      final ListTile widgetTemp = ListTile(
        title: Text(opt['texto']),
        leading: getIcon(opt['icon']),
        trailing: Icon(
          Icons.keyboard_arrow_right,
          color: Colors.blue,
        ),
        onTap: () {
          Navigator.pushNamed(context, opt['ruta']);
          // final MaterialPageRoute route =
          //     MaterialPageRoute(builder: (context) => AlertPage());
          // Navigator.push(context, route);
        },
      );
      opciones..add(widgetTemp)..add(Divider());
    });

    return opciones;
  }
}
