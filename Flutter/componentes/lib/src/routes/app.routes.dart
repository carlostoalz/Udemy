import 'package:flutter/material.dart';
import 'package:componentes/src/pages/home.page.dart';
import 'package:componentes/src/pages/alert.page.dart';
import 'package:componentes/src/pages/avatar.page.dart';
import 'package:componentes/src/pages/card.page.dart';
import 'package:componentes/src/pages/animated_container.page.dart';
import 'package:componentes/src/pages/input.page.dart';
import 'package:componentes/src/pages/slider.page.dart';
import 'package:componentes/src/pages/listview.page.dart';

Map<String, WidgetBuilder> getApplicationRoutes() => <String, WidgetBuilder>{
      '/': (BuildContext context) => HomePage(),
      'alert': (BuildContext context) => AlertPage(),
      'avatar': (BuildContext context) => AvatarPage(),
      'card': (BuildContext context) => CardPage(),
      'animatedContainer': (BuildContext context) => AnimatedContainerPage(),
      'inputs': (BuildContext context) => InputPage(),
      'slider': (BuildContext context) => SliderPage(),
      'list': (BuildContext context) => ListaPage(),
    };
