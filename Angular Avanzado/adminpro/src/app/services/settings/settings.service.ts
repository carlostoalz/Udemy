import { Injectable, Inject } from '@angular/core';
import { IAjustes } from '../../interfaces/IAjustes';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: IAjustes = {
    teamUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes() {
    
    if ( localStorage.getItem( 'ajustes' ) ) {
      this.ajustes = JSON.parse( localStorage.getItem( 'ajustes' ) );
      this.aplicarTema( this.ajustes.tema );
    } else {
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema( tema: string ) {
    let url: string = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url );

    this.ajustes = {
      tema: tema,
      teamUrl: url
    };

    this.guardarAjustes();
  }
}
