import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  constructor(
    public _us: UsuariosService
  ) {

    this._us.obtenerUsuarios()
    .subscribe(
      resp => console.log( resp )  
    );

  }

}
