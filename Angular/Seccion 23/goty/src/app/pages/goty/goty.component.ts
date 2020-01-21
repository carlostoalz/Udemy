import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { IGame } from '../../interfaces/IGame';
import { SwalUtil } from '../../utils/swal.util';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styles: []
})
export class GotyComponent implements OnInit {
  
  juegos: IGame[] = [];
  private swal: SwalUtil = new SwalUtil();

  constructor( private _gs: GameService ) { }

  ngOnInit() {
    this._gs.getNominados().subscribe(
      res => {
        this.juegos = res;
      }
    );
  }

  votar( idJuego: string ) {
    // idJuego = 'a';
    this.swal.Espere();
    this._gs.votarJuego( idJuego ).subscribe(
      res => {
        console.log('Respuesta :', res);
        if ( res.ok )
          this.swal.Exitoso( 'Gracias', res.mensaje );
        else 
          this.swal.Error( res.mensaje );
      },
      ex => {
        this.swal.Error( ex['message'] );
      }
    );
  }

}
