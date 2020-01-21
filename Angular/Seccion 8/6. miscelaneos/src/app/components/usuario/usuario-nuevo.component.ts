import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html'
})
export class UsuarioNuevoComponent implements OnInit {

  constructor( private _activatedRoute: ActivatedRoute ) { 
    this._activatedRoute.parent.params.subscribe(
      (parametros) => {
        console.log('Ruta hija nuevo');
        console.log(parametros);
      },
      (ex: any) => {
        console.log(ex);
      }
    );
  }

  ngOnInit() {
  }

}
