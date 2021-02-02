import 'package:flutter/material.dart';

class CardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text('Cards'),
        ),
        body: ListView(
          padding: EdgeInsets.all(10.0),
          children: [
            _cardTipo1(),
            SizedBox(
              height: 30.0,
            ),
            _cardTipo2()
          ],
        ),
      );

  Widget _cardTipo1() => Card(
        elevation: 10.0,
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(20.0)),
        child: Column(
          children: [
            ListTile(
              leading: Icon(
                Icons.photo_album,
                color: Colors.blue,
              ),
              title: Text('Soy el titulo de esta tarjeta'),
              subtitle: Text(
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus convallis augue rutrum dignissim. In semper augue at tellus ullamcorper malesuada. Integer a elit dapibus, tempor odio ultrices, laoreet augue. Vestibulum ante ipsum primis in nunc.'),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                FlatButton(
                  child: Text('Ok'),
                  onPressed: () {},
                ),
                FlatButton(
                  child: Text('Cancelar'),
                  onPressed: () {},
                ),
              ],
            )
          ],
        ),
      );

  Widget _cardTipo2() {
    final card = Container(
      child: Column(
        children: [
          FadeInImage(
            image: NetworkImage(
                'https://photographylife.com/wp-content/uploads/2019/11/Fujifilm-GFX-100-Image-Sample-32.jpg'),
            placeholder: AssetImage('assets/jar-loading.gif'),
            fadeInDuration: Duration(milliseconds: 200),
            height: 300,
            fit: BoxFit.cover,
          ),
          // Image(
          //   image: NetworkImage(
          //       'https://photographylife.com/wp-content/uploads/2019/11/Fujifilm-GFX-100-Image-Sample-32.jpg'),
          // ),
          Container(
            padding: EdgeInsets.all(10),
            child: Text(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet tortor eu enim pellentesque feugiat. Mauris eget ut.'),
          )
        ],
      ),
    );

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30.0),
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 10.0,
            spreadRadius: 2.0,
            offset: Offset(2.0, 10.0),
          ),
        ],
      ),
      child: ClipRRect(
        child: card,
        borderRadius: BorderRadius.circular(30.0),
      ),
    );
  }
}
