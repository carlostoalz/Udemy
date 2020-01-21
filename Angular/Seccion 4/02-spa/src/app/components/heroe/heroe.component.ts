import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Heroe, HeroesService } from 'src/app/services/heroes,service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})
export class HeroeComponent {
  
  heroe:Heroe;

  constructor(private _activatedRoute:ActivatedRoute,
              private _heroesService:HeroesService) {
    this._activatedRoute.params.subscribe(params => {
      this.heroe =  this._heroesService.getHeroe(params["id"]);
    });
   }

}
