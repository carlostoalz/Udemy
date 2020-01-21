import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService,Heroe } from '../../services/heroes,service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent implements OnInit {
  
  heroes:Heroe[] = [];

  constructor(private _heroesService:HeroesService,
              private _router:Router) { }

  ngOnInit() {
    this.heroes = this._heroesService.getHeroes();
  }
  
  verHeroe(idx:number){
    this._router.navigate(['/heroe',idx]);
  }

}
