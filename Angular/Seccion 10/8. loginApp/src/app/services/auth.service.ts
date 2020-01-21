import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { UsuarioModel } from '../models/usuario.model';
import { EmailLogInRequestModel } from '../models/emailLogInRequest.model';
import { EmailSingUpRequestModel } from '../models/emailSingUpRequest.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apikey: string = "AIzaSyD0IysNlM7W_IjeroBnFbQvCYd_JSOKuog";
  userToken: string;

  //crear nuevos usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logOut() {
    localStorage.removeItem('token');
  }

  logIn(usuario: UsuarioModel): Observable<any> {
    let authData: EmailLogInRequestModel = new EmailLogInRequestModel(usuario.email, usuario.password, true);

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  singUp(usuario: UsuarioModel): Observable<any> {
    let authData: EmailSingUpRequestModel = new EmailSingUpRequestModel(usuario.email, usuario.password, true);

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);
    let hoy: Date = new Date();
    hoy.setSeconds(36000);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    const expira: number = Number(localStorage.getItem('expira'));
    const expiraDate: Date = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
