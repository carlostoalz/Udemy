import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { SwalUtil } from 'src/app/utils/swal.util';
import { HeroeModel } from 'src/app/models/heroe.model';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  private swal: SwalUtil = new SwalUtil();
  heroes: HeroeModel[] = [];
  cargando: boolean = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.getHeroes();
  }

  getHeroes(){
    this.heroesService.getHeroes()
    .subscribe(
      (data: HeroeModel[]) => {
        this.heroes = data;
        this.cargando = false;
      },
      (ex: any) => {
        this.swal.Error(ex.message);
      }
    );
  }

  borrarHeroe( heroe: HeroeModel, index: number ){    
    this.swal.Pregunta('¿Esta Seguro?',`Que desea borrar a ${ heroe.nombre }`)
    .then( (resp: SweetAlertResult) => {
      if (resp.value) {
        this.heroesService.borrarHeroe(heroe.id)
          .subscribe(
            (resp) => {
              console.log(resp);
              this.heroes.splice(index,1);
            },
            (ex: any) => this.swal.Error(ex.message)
          );              
      }
    })
    .catch( ex => this.swal.Error(ex.message))
  }

}
