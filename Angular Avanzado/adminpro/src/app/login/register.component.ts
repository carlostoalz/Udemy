import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalUtil } from '../utils/swal.util';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  swal: SwalUtil = new SwalUtil();
  forma: FormGroup;

  constructor( public _us: UsuarioService,
               public router: Router ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),      
      condiciones: new FormControl( false )  
    }, 
    {
      validators: this.sonIguales( 'password', 'password2' )
    });

    this.forma.setValue({
      nombre: 'Carlos Andres Tobon Alzate',
      correo: 'carlostoalz@hotmail.com',
      password: 'contigente3del9',
      password2: 'contigente3del9',
      condiciones: true
    });
  }

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {

      let pass1: string = group.controls[campo1].value;
      let pass2: string = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null
      } 
      
      return {
        sonIguales: true
      };

    };
  }

  registrarUsuario() {

    if ( !this.forma.value.condiciones ) {

      this.swal.Alerta( 'Importante', 'Debe aceptar las condiciones' );      
      return;

    }

    if ( this.forma.invalid ) {
      return;
    }

    let usuario: Usuario = new Usuario(
      this.forma.value.nombre, 
      this.forma.value.correo, 
      this.forma.value.password
    );
    

    this._us.postQuery('usuario', usuario)
    .subscribe( 
      resp => this.router.navigate(['/login']),
      err => this.swal.Error(err.message)
    );
  }

}
