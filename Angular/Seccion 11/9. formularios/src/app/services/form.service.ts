import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  traerPaises(){
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }
}
