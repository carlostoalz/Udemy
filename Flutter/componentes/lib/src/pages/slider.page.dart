import 'package:flutter/material.dart';

class SliderPage extends StatefulWidget {
  @override
  _SliderPageState createState() => _SliderPageState();
}

class _SliderPageState extends State<SliderPage> {
  double _valorSlider = 100.0;
  bool _bloquearCheck = false;

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text('Slider'),
        ),
        body: Container(
          padding: EdgeInsets.only(top: 50.0),
          child: Column(
            children: [
              this._crearSlider(),
              this._crearCheckBox(),
              this._crearSwitch(),
              Expanded(
                child: this._crearImagen(),
              ),
            ],
          ),
        ),
      );

  Widget _crearSlider() => Slider(
        value: this._valorSlider,
        min: 10.0,
        max: 400.0,
        onChanged: this._bloquearCheck
            ? null
            : (valor) => setState(() => this._valorSlider = valor),
        activeColor: Colors.indigoAccent,
        label: 'Tamaño de la imagen',
      );

  Widget _crearImagen() => Image(
        image: NetworkImage(
            'https://static.wikia.nocookie.net/death-battle-fanon-wiki-en-espanol/images/9/90/The_Flash.png/revision/latest?cb=20191214205333&path-prefix=es'),
        width: this._valorSlider,
        fit: BoxFit.contain,
      );

  Widget _crearCheckBox() => CheckboxListTile(
        title: Text('Bloquear Slider'),
        value: _bloquearCheck,
        onChanged: (valor) => setState(() => this._bloquearCheck = valor),
      );

  Widget _crearSwitch() => SwitchListTile(
        title: Text('Bloquear Slider'),
        value: _bloquearCheck,
        onChanged: (valor) => setState(() => this._bloquearCheck = valor),
      );
}
