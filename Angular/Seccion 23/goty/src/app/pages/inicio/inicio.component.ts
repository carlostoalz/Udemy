import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IGame } from '../../interfaces/IGame';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {
  
  juegos: { name: string, value: number }[] = [];

  constructor( private db: AngularFirestore ) { }

  ngOnInit() {
    this.db.collection('goty').valueChanges()
    .pipe(
      map( ( res: IGame[] ) => res.map( ( { name, votos } ) => ( { name, value: votos } ) ) )
    )
    .subscribe( juegos => {
      // console.log( juegos );
      this.juegos = juegos;
    });
  }

}
