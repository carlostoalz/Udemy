import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private urlHeroes: string = 'https://heroes-app-665b3.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.urlHeroes}/heroes.json`,heroe)
            .pipe(
              map( (resp:any) => {
                heroe.id = resp.name;
                return heroe;
              })
            );
  }

  actualizarHeroe( heroe: HeroeModel ){
    
    const heroeTem = {
      ...heroe
    };

    delete heroeTem.id;

    return this.http.put(`${this.urlHeroes}/heroes/${heroe.id}.json`,heroeTem);
  }

  getHeroes(){
    return this.http.get(`${this.urlHeroes}/heroes.json`)
              .pipe(
                map( this.crearArreglo ),
                delay(600)
              );
  }

  getHeroe( id: string ){
    return this.http.get(`${ this.urlHeroes }/heroes/${ id }.json`);
  }

  borrarHeroe(id: string){
    return this.http.delete(`${ this.urlHeroes }/heroes/${ id }.json`);
  }

  private crearArreglo( heroesObj: any ): HeroeModel[]{

    const heroes: HeroeModel[] = [];

    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
}
