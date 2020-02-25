import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(
    private http: HttpClient
  ) { }

  buscar( termino: string ) : Observable<any> {

    let url: string = `${ URL_SERVICIOS }/busqueda/todo/${ termino }`

    return this.http.get( url );

  }
}
