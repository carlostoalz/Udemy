import 'package:flutter/material.dart';

class InputPage extends StatefulWidget {
  @override
  _InputPageState createState() => _InputPageState();
}

class _InputPageState extends State<InputPage> {
  String _nombre = '';
  String _email = '';
  String _password = '';
  String _fecha = '';
  List<String> _poderes = [
    'Volar',
    'Super Fuerza',
    'Super Velocidad',
    'Visión de rayos x',
    'Visión laser',
    'Invunerabilidad',
    'Super Aliento',
    'Factor Regenerativo',
  ];
  String _opcionSeleccionada = 'Volar';

  TextEditingController _inputFieldDateController = new TextEditingController();

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text('Inputs de texto'),
        ),
        body: ListView(
          padding: EdgeInsets.symmetric(
            horizontal: 10.0,
            vertical: 20.0,
          ),
          children: [
            _crearInput(),
            Divider(),
            _crearEmail(),
            Divider(),
            _crearPassword(),
            Divider(),
            _crearFecha(context),
            Divider(),
            _crearDropDown(),
            Divider(),
            _crearPersona(),
          ],
        ),
      );

  Widget _crearInput() => TextField(
        textCapitalization: TextCapitalization.sentences,
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          counter: Text('Letras ${this._nombre.length}'),
          hintText: 'Nombre de la persona',
          labelText: 'Nombre',
          helperText: 'Sólo es el nombre',
          suffixIcon: Icon(Icons.accessibility),
          icon: Icon(Icons.account_circle),
        ),
        onChanged: (valor) => setState(() {
          this._nombre = valor;
        }),
      );

  Widget _crearPersona() => ListTile(
        title: Text('Nombre es: $_nombre'),
        subtitle: Text('Email: ${this._email}'),
        leading: Text(_opcionSeleccionada),
      );

  Widget _crearEmail() => TextField(
        keyboardType: TextInputType.emailAddress,
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          hintText: 'Email',
          labelText: 'Email',
          suffixIcon: Icon(Icons.alternate_email),
          icon: Icon(Icons.email),
        ),
        onChanged: (valor) => setState(() {
          this._email = valor;
        }),
      );

  Widget _crearPassword() => TextField(
        obscureText: true,
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          hintText: 'Password',
          labelText: 'Password',
          suffixIcon: Icon(Icons.lock_outline),
          icon: Icon(Icons.lock),
        ),
        onChanged: (valor) => setState(() {
          this._password = valor;
        }),
      );

  Widget _crearFecha(BuildContext context) => TextField(
        enableInteractiveSelection: false,
        controller: _inputFieldDateController,
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          hintText: 'Fecha de nacimiento',
          labelText: 'Fecha de nacimiento',
          suffixIcon: Icon(Icons.calendar_today_outlined),
          icon: Icon(Icons.calendar_today),
        ),
        onTap: () {
          FocusScope.of(context).requestFocus(new FocusNode());
          _selectDate(context);
        },
      );

  void _selectDate(BuildContext context) async {
    DateTime picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: new DateTime(1900),
      lastDate: new DateTime(2025),
      locale: Locale('es', 'CO'),
    );

    if (picked != null) {
      setState(() {
        this._fecha = '${picked.day}/${picked.month}/${picked.year}';
        this._inputFieldDateController.text = this._fecha;
      });
    }
  }

  Widget _crearDropDown() {
    return Row(
      children: [
        Icon(Icons.select_all),
        SizedBox(
          width: 30.0,
        ),
        Expanded(
          child: DropdownButton(
            items: getOpcionesDropdown(),
            value: this._opcionSeleccionada,
            onChanged: (opt) => setState(() {
              this._opcionSeleccionada = opt;
            }),
          ),
        ),
      ],
    );
  }

  List<DropdownMenuItem<String>> getOpcionesDropdown() {
    List<DropdownMenuItem<String>> lista = new List<DropdownMenuItem<String>>();
    _poderes.forEach((poder) => lista.add(new DropdownMenuItem(
          value: poder,
          child: Text(poder),
        )));
    return lista;
  }
}
