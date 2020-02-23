import { Injectable } from '@angular/core';
import { IServiceCRUD } from '../../interfaces/IServiceCRUD';
import { Hospital } from '../../models/hospital.model';
import { SwalUtil } from '../../utils/swal.util';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService implements IServiceCRUD<Hospital> {

  private swal: SwalUtil = new SwalUtil();
  public totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _us: UsuarioService
  ) { }

  get(query: string): Observable<any> {

    return this.http.get( `${ URL_SERVICIOS }/${ query }` )
    .pipe(
      map( resp => {
        this.totalHospitales = resp['total'];
        return resp['hospitales'];
      })
    );

  }

  getOne(query: string): Observable<any> {
    
    return this.http.get( `${ URL_SERVICIOS }/${ query }` )
    .pipe(
      map( resp => resp['hospital'])
    );

  }

  post(query: string, value: Hospital): Observable<any> {

    return this.http.post( `${ URL_SERVICIOS }/${ query }?token=${ this._us.token }`, value )
    .pipe(
      map( resp => {
        this.swal.Exitoso( 'OK!', 'Hospital creado' );
        return resp['hospital'];
      })
    );

  }

  put(query: string, value: Hospital): Observable<any> {

    return this.http.put( `${ URL_SERVICIOS }${ query }?token=${ this._us.token }`, value )
    .pipe(
      map( resp => {
        this.swal.Exitoso( 'OK!', 'Hospital actualizado' );
        return resp['hospital'];
      })
    );

  }

  delete(query: string): Observable<any> {

    return this.http.delete( `${ URL_SERVICIOS }/${ query }?token=${ this._us.token }` )
    .pipe(
      map( resp => this.swal.Exitoso( 'OK!', 'Hospital Borrado' ) )
    );

  }
  
}
