import 'package:flutter/material.dart';

class AvatarPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text('Avatar Page'),
          actions: [
            Container(
              padding: EdgeInsets.all(5),
              child: CircleAvatar(
                backgroundImage: NetworkImage(
                  'https://www.eltiempo.com/files/article_main/files/crop/uploads/2020/07/19/5f142f705a5b0.r_1608354143714.0-0-950-472.png',
                ),
                radius: 30.0,
              ),
            ),
            Container(
              margin: EdgeInsets.only(
                right: 10.0,
              ),
              child: CircleAvatar(
                child: Text('SL'),
                backgroundColor: Colors.brown,
              ),
            )
          ],
        ),
        body: Center(
          child: FadeInImage(
            image: NetworkImage(
                'https://www.mundialdemusica.net/wp-content/uploads/2020/03/camport.jpg'),
            placeholder: AssetImage('assets/jar-loading.gif'),
            fadeInDuration: Duration(milliseconds: 200),
          ),
        ),
      );
}
