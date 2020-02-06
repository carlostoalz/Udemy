import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { SwalUtil } from '../utils/swal.util';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string = "";
  swal: SwalUtil = new SwalUtil();

  auth2: any;

  constructor( 
    public router: Router, 
    public _us: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  googleInit( ) {

    gapi.load('auth2', () => {
      
      this.auth2 = gapi.auth2.init({
        client_id: '911038678764-p27t4el6ndtso2ba60kfsgp9um5ud1g0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin( element ) {
    
    this.auth2.attachClickHandler( element, {}, (googleUser: any) =>  {
      
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._us.loginGoogle( token )
      .subscribe(
        resp => window.location.href = '#/dashboard',
        err => this.swal.Error( err.error.mensaje )
      );

    });

  }

  ingresar( forma: NgForm ) {
    
    if ( forma.invalid ) {
      return;
    }

    let usuario: Usuario = new Usuario( null, forma.value.email, forma.value.password );

    this._us.login(usuario, this.recuerdame)
    .subscribe(
      correcto => this.router.navigate(['/dashboard']),
      err => this.swal.Error( err.error.mensaje )
    );

  }

}
