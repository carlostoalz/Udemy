import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { DateUtil } from '../utils/date.util';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiKey: string = "46bea4277a9a2528d6586a181fc0b205";
  private urlMoviedb: string = "https://api.themoviedb.org/3";
  private dateUtil: DateUtil = new DateUtil();

  public peliculas: any[] = [];

  constructor( private http: HttpClient ) { }
  
  getCartelera(){
    
    let desdeStr: string = new Date().toString();
    let hasta: Date = new Date();
    hasta.setDate( hasta.getDate() + 7 );
    let hastaStr: string = hasta.toString();  

    let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${ this.dateUtil.formatDate(desdeStr) }&primary_release_date.lte=${ this.dateUtil.formatDate(hastaStr) }&api_key=${ this.apiKey }`;
    return this.http.jsonp(url,"callback")
    .pipe(
      map(data => data["results"])
    );    
  }

  getPopulares(){
    let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;

    return this.http.jsonp(url,"callback")
    .pipe(
      map(data => data["results"])
    );    
  }

  getPopularesNinos(){
    let url = `${ this.urlMoviedb }/discover/movie?certification_country=CO&certification.lte=E&sort_by=popularity.desc&api_key=${ this.apiKey }&language=es`;

    return this.http.jsonp(url,"callback")
    .pipe(
      map(data => data["results"])
    );    
  }

  buscarPelicula( texto: string, page?: number, include_adult: boolean = false ){
    let url = `${ this.urlMoviedb }/search/movie?api_key=${ this.apiKey }&language=es-CO&query=${ texto }&include_adult=${ include_adult }`;

    if(page !== null && page > 0){
      url += `&page=${ page }`;
    } else {
      url += `&page=1`;
    }

    return this.http.jsonp(url,"callback")
    .pipe(
      map(data => {
        this.peliculas = data["results"];
        return data["results"];
      })
    );
  }

  getPelicula(movie_id: string){
    let url = `${ this.urlMoviedb }/movie/${ movie_id }?api_key=${ this.apiKey }&language=es-CO`;

    return this.http.jsonp(url,"callback");
  }
}
