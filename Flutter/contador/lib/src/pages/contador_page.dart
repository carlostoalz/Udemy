import 'package:flutter/material.dart';

class ContadorPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _ContadorPageState();
}

class _ContadorPageState extends State<ContadorPage> {
  final TextStyle _estiloTexto = new TextStyle(fontSize: 25);
  int _conteo = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Título'),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Número de tabs: ',
              style: _estiloTexto,
            ),
            Text(
              '$_conteo',
              style: _estiloTexto,
            ),
          ],
        ),
      ),
      floatingActionButton: _crearBotones(),
    );
  }

  Widget _crearBotones() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        SizedBox(width: 30),
        FloatingActionButton(
          child: Icon(Icons.exposure_zero),
          onPressed: _reiniciar,
        ),
        Expanded(child: SizedBox()),
        FloatingActionButton(
          child: Icon(Icons.add),
          onPressed: _sumar,
        ),
        SizedBox(width: 5),
        FloatingActionButton(
          child: Icon(Icons.remove),
          onPressed: _restar,
        ),
      ],
    );
  }

  void _sumar() => setState(() => _conteo++);

  void _restar() => setState(() => (_conteo - 1) >= 0 ? _conteo-- : _conteo);

  void _reiniciar() => setState(() => _conteo = 0);
}
