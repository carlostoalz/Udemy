import { Injectable } from '@angular/core';
import { IServiceCRUD } from '../../interfaces/IServiceCRUD';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Observable } from "rxjs";
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { SwalUtil } from '../../utils/swal.util';

@Injectable({
  providedIn: 'root'
})
export class MedicoService implements IServiceCRUD<Medico> {

  public totalMedicos: number = 0;
  private swal: SwalUtil = new SwalUtil();

  constructor(
    public http: HttpClient,
    public _us: UsuarioService
  ) { }

  get(query: string): Observable<any> {
    
    return this.http.get( `${ URL_SERVICIOS }/${ query }` )
    .pipe(
      map( resp => {
        this.totalMedicos = resp['total'];
        return resp['medicos'];
      }),
      catchError( err => {

       this.swal.Errors( err );
       return Observable.throw( err );

      })
    );

  }
  getOne(query: string): Observable<any> {
    
    return this.http.get( `${ URL_SERVICIOS }/${ query }` )
    .pipe(
      map( resp => resp['medico']),
      catchError( err => {

       this.swal.Errors( err );
       return Observable.throw( err );

      })
    );

  }
  post(query: string, value: Medico): Observable<any> {
    
    return this.http.post( `${ URL_SERVICIOS }/${ query }?token=${ this._us.token }`, value )
    .pipe(
      map( resp => {
        this.swal.Exitoso( 'OK!', 'Médico creado' );
        return resp['medico'];
      }),
      catchError( err => {

       this.swal.Errors( err );
       return Observable.throw( err );

      })
    );

  }
  put(query: string, value: Medico): Observable<any> {
    
    return this.http.put( `${ URL_SERVICIOS }/${ query }?token=${ this._us.token }`, value )
    .pipe(
      map( resp => {
        this.swal.Exitoso( 'OK!', 'Médico Actualizado' );
        return resp['medico'];
      }),
      catchError( err => {

       this.swal.Errors( err );
       return Observable.throw( err );

      })
    );

  }
  delete(query: string): Observable<any> {
    
    return this.http.delete( `${ URL_SERVICIOS }/${ query }?token=${ this._us.token }` )
    .pipe(
      map( () => this.swal.Exitoso( 'OK!', 'Médico Borrado' ) ),
      catchError( err => {

       this.swal.Errors( err );
       return Observable.throw( err );

      })
    );

  }  
}
