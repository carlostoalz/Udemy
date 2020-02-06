import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { IServiceCRUD } from 'src/app/interfaces/IServiceCRUD';
import { URL_SERVICIOS } from "../../config/config";
import { SwalUtil } from '../../utils/swal.util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IServiceCRUD<Usuario> {
  
  private urlBase: string = "http://localhost:3000/";
  swal: SwalUtil = new SwalUtil();
  usuario: Usuario;
  token: string; 
  
  constructor( 
    public http: HttpClient ,
    public router: Router
  ) { 
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = <Usuario>JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStoage( id: string, token: string, usuario: Usuario ) {
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) : Observable<any> {

    
    return this.http.post(`${ URL_SERVICIOS }/login`, usuario)
           .pipe(
             map( (resp: any) => {
               
                if ( recordar ) {
                  localStorage.setItem('email', usuario.email);
                } else {
                 localStorage.removeItem('email');
                }

                this.guardarStoage( resp.id, resp.token, resp.usuario );
  
                return true;
             })
           );

  }

  loginGoogle( token: string, recordar: boolean = false ): Observable<any> {

    return this.http.post(`${ URL_SERVICIOS }/login/google`, { token })
    .pipe(
      map((resp: any) => {

        if ( recordar ) {
          localStorage.setItem('email', resp.email);
        } else {
         localStorage.removeItem('email');
        }
        
        this.guardarStoage( resp.id, resp.token, resp.usuario );

        return true;

      })
    );
    
  }
  
  getQuery(query: string): Observable<any> {

    return this.http.get( `${ URL_SERVICIOS }/${ query }` );

  }

  postQuery(query: string, value: Usuario, token?: string): Observable<any> {

    let url: string = "";

    if (token) {
      url = `${ URL_SERVICIOS }/${ query }?token=${ token }`;
    } else {
      url = `${ URL_SERVICIOS }/${ query }`;
    }
    
    return this.http.post( url, value )
    .pipe(
      map( (res: any) => {
        this.swal.Exitoso('Usuario Creado', value.email);
        res.usuario;
      })
    );

  }

  putQuery(query: string, value: Usuario, token: string): Observable<any> {
    
    return this.http.put( `${ URL_SERVICIOS }/${ query }?token=${ token }`, value );

  }

  deleteQuery(query: string, token: string): Observable<any> {
    
    return this.http.delete( `${ URL_SERVICIOS }/${ query }?token=${ token }` );

  }
}
