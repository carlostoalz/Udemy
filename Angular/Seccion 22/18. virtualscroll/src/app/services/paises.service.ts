import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  private restCountriesUrl: string = 'https://restcountries.eu/rest/v2/';

  constructor(private http: HttpClient) { }

  getPaises(): Observable<any> {
    return this.http.get( `${ this.restCountriesUrl }lang/es` );
  }
}
