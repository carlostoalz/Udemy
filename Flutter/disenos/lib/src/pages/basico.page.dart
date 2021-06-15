import 'package:flutter/material.dart';

class BasicoPage extends StatelessWidget {
  final TextStyle estiloTitulo =
      TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold);
  final TextStyle estiloSubTitulo =
      TextStyle(fontSize: 18.0, color: Colors.grey);
  final TextStyle estiloAccion = TextStyle(fontSize: 16.0, color: Colors.blue);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [_crearImagen(), _crearTitulo(), _acciones()],
      ),
    );
  }

  Widget _crearImagen() => Image(
        image: NetworkImage(
            'https://lacf.ca/sites/default/files/images/homepage/banners/P14%20-%20brightcropped%20for%20landing%20page_%20Bridge%20in%20Gablenz%2C%20Germany%2C%20Photo%20by%20Martin%20Damboldt%20from%20Pexels.jpg'),
      );

  Widget _crearTitulo() => Container(
        padding: EdgeInsets.symmetric(horizontal: 30.0, vertical: 20.0),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Lago con un puente', style: estiloTitulo),
                  SizedBox(height: 7.0),
                  Text('Un lago en Alemania', style: estiloSubTitulo),
                ],
              ),
            ),
            Icon(Icons.star, color: Colors.red, size: 30.0),
            Text('41', style: TextStyle(fontSize: 20.0))
          ],
        ),
      );

  Widget _acciones() => Container(
        padding: EdgeInsets.symmetric(horizontal: 50.0, vertical: 20.0),
        // alignment: ,
        child: Row(
          children: [
            _accion(Icons.call, 'CALL'),
            _accion(Icons.near_me, 'ROUTE'),
            _accion(Icons.share, 'SHARE')
          ],
        ),
      );

  Widget _accion(IconData icon, String texto) => Column(
        children: [
          Icon(icon, color: Colors.blue, size: 40.0),
          Text(
            texto,
            style: estiloAccion,
          )
        ],
      );
}
