import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
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
      })
    );

  }

  put( query: string, value: Usuario ): Observable<any> {
    
    return this.http.put( `${ URL_SERVICIOS }${ query }?token=${ this.token }`, value )
    .pipe(
      map( (resp: any) =>  {

        if ( value._id === this.usuario._id ) {
          this.guardarStoage( resp.usuario._id, this.token, resp.usuario );          
        }
        this.swal.Exitoso('Usuario Actualizado', value.nombre);

        return true;
      })
    );

  }

  delete(query: string ): Observable<any> {
    
    return this.http.delete( `${ URL_SERVICIOS }/${ query }?token=${ this.token }` )
            .pipe(
              map( resp => {

                this.swal.Exitoso('OK!', 'Usuario Borrado');
                return true;

              })
            );

  }

  cambiarImagen ( archivo: File, id: string ) {

    this._sa.subirArchivo( archivo, 'usuarios', id )
    .then( (resp: any) => {

      console.log(resp);

      this.usuario.img = (<Usuario>resp.usuario).img;
      this.swal.Exitoso('OK!', resp.mensaje);

      this.guardarStoage( id, this.token, this.usuario );

    })
    .catch( err => this.swal.Errors( err ));

  }
}
