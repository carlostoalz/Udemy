import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { IServiceCRUD } from 'src/app/interfaces/IServiceCRUD';
import { URL_SERVICIOS } from "../../config/config";
import { SwalUtil } from '../../utils/swal.util';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IServiceCRUD<Usuario> {
  
  private urlBase: string = "http://localhost:3000/";
  swal: SwalUtil = new SwalUtil();
  usuario: Usuario;
  token: string;
  menu: any[] = [];
  
  constructor( 
    public http: HttpClient,
    public router: Router,
    public _sa: SubirArchivoService
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
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStoage( id: string, token: string, usuario: Usuario, menu: any ) {
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) : Observable<any> {

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    
    return this.http.post(`${ URL_SERVICIOS }/login`, usuario)
           .pipe(
             map( (resp: any) => {
               
                if ( recordar ) {
                  localStorage.setItem('email', usuario.email);
                } else {
                 localStorage.removeItem('email');
                }

                this.guardarStoage( resp.id, resp.token, resp.usuario, resp.menu );
  
                return true;
             }),
             catchError( err => {

              this.swal.Errors( err );
              return Observable.throw( err );

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
        
        this.guardarStoage( resp.id, resp.token, resp.usuario, resp.menu );

        return true;

      }),
      catchError( err => {

       this.swal.Errors( err );
       return Observable.throw( err );

      })
    );
    
  }
  
  get(query: string): Observable<any> {
    return this.http.get( `${ URL_SERVICIOS }/${ query }` );
  }

  getOne(query: string): Observable<any> {
    throw new Error("Method not implemented.");
  }

  post(query: string, value: Usuario ): Observable<any> {

    let url: string = "";

    if (this.token) {
      url = `${ URL_SERVICIOS }/${ query }?token=${ this.token }`;
    } else {
      url = `${ URL_SERVICIOS }/${ query }`;
    }
    
    return this.http.post( url, value )
    .pipe(
      map( (res: any) => {
        this.swal.Exitoso('Usuario Creado', value.email);
        res.usuario;
      }),
      catchError( err => {

       this.swal.Errors( err );
       return Observable.throw( err );

      })
    );

  }

  put( query: string, value: Usuario ): Observable<any> {
    
    return this.http.put( `${ URL_SERVICIOS }${ query }?token=${ this.token }`, value )
    .pipe(
      map( (resp: any) =>  {

        if ( value._id === this.usuario._id ) {
          this.guardarStoage( resp.usuario._id, this.token, resp.usuario, this.menu );          
        }
        this.swal.Exitoso('Usuario Actualizado', value.nombre);

        return true;
      }),
      catchError( err => {

       this.swal.Errors( err );
       return Observable.throw( err );

      })
    );

  }

  delete(query: string ): Observable<any> {
    
    return this.http.delete( `${ URL_SERVICIOS }/${ query }?token=${ this.token }` )
            .pipe(
              map( resp => {

                this.swal.Exitoso('OK!', 'Usuario Borrado');
                return true;

              }),
              catchError( err => {
 
               this.swal.Errors( err );
               return Observable.throw( err );
 
              })
            );

  }

  cambiarImagen ( archivo: File, id: string ) {

    this._sa.subirArchivo( archivo, 'usuarios', id )
    .then( (resp: any) => {

      console.log(resp);

      this.usuario.img = (<Usuario>resp.usuario).img;
      this.swal.Exitoso('OK!', resp.mensaje);

      this.guardarStoage( id, this.token, this.usuario, this.menu );

    })
    .catch( err => this.swal.Errors( err ));

  }
}
