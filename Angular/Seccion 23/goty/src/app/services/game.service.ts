import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IGame } from '../interfaces/IGame';
import { IRespuesta } from '../interfaces/IRespuesta';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SwalUtil } from '../utils/swal.util';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: IGame[] = [];
  private swal: SwalUtil = new SwalUtil();

  constructor(private http: HttpClient) { }

  getNominados(){
    if ( this.juegos.length > 0 ) {
      return of( this.juegos );
    } else {
      return this.http.get<IGame[]>( `${ environment.url }/api/goty` )
             .pipe(
               tap(
                 juegos => this.juegos = juegos
               )
             );
    }
  }

  votarJuego( idJuego:string ) {
    return this.http.post<IRespuesta>( `${ environment.url }/api/goty/${ idJuego }`, null )
           .pipe(
             catchError( ex => {
                return of(ex['error']);
             })
           );
  }
}
