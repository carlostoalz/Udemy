import { Component, OnInit } from '@angular/core';

import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  private durationInSeconds = 3;

  marcadores: Marcador[] = [];

  lat: number = 6.3277912;
  lng: number = -75.5670193;

  constructor( public snackBar: MatSnackBar,
               public dialog: MatDialog ) { 

    if ( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
   
  }

  ngOnInit() {
  }

  agregarMarcador( evento: any ){

    const coords: { lat: number, lng: number} = evento['coords'];
    const nuevoMarcador: Marcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push( nuevoMarcador );
    
    this.guardarStorage();
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: this.durationInSeconds * 1000 } );

  }

  editarMarcador( marcador: Marcador ){
    const dialogRef = this.dialog.open( MapaEditarComponent , {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed()
    .subscribe(
      (result: Marcador) => {

        if (result === undefined || result == null) {
          return;
        }

        marcador.titulo = result['titulo'];
        marcador.desc = result['desc'];

        this.guardarStorage();
        this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: this.durationInSeconds * 1000 } );
      }
    );
  }

  borrarMarcador( index: number ){
    this.marcadores.splice( index, 1 );
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: this.durationInSeconds * 1000 } );
  }

  guardarStorage(){

    localStorage.setItem( 'marcadores', JSON.stringify( this.marcadores ) );

  }

}
