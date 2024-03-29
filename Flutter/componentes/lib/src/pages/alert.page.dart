import 'package:flutter/material.dart';

class AlertPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text('Alert Page'),
        ),
        body: Center(
          child: RaisedButton(
            child: Text('Mostrar Alerta'),
            color: Colors.blue,
            textColor: Colors.white,
            shape: StadiumBorder(),
            onPressed: () => _mostrarAlerta(context),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add_location),
          onPressed: () => Navigator.pop(context),
        ),
      );

  void _mostrarAlerta(BuildContext context) {
    showDialog(
        context: context,
        barrierDismissible: true,
        builder: (context) => AlertDialog(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20.0),
              ),
              title: Text('Titulo'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text('Este es el contenido de la alerta'),
                  FlutterLogo(
                    size: 100.0,
                  )
                ],
              ),
              actions: [
                FlatButton(
                  child: Text('Ok'),
                  onPressed: () => Navigator.of(context).pop(),
                ),
                FlatButton(
                  child: Text('Cancelar'),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ));
  }
}
