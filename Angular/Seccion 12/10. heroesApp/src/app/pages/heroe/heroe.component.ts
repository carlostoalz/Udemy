import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { Observable } from 'rxjs';
import { SwalUtil } from 'src/app/utils/swal.util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  private swal: SwalUtil = new SwalUtil();

  constructor(private heroesServices: HeroesService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.getHeroe(id);
    }    
  }

  getHeroe( id: string){
    this.heroesServices.getHeroe(id)
      .subscribe(
        (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        },
        (ex: any) => this.swal.Error(ex.message)
      );
  }

  guardar( form: NgForm ){

    if (form.invalid) {
      console.log('Formualrio no valido');
      return;
    }

    this.swal.Espere();    

    let peticion: Observable<any>;
    
    if (this.heroe.id) {
      peticion = this.heroesServices.actualizarHeroe(this.heroe);
    } else {      
      peticion = this.heroesServices.crearHeroe(this.heroe);
    }
    
    peticion.subscribe(
      (data: any) => {
        console.log(data);
        this.swal.ExitosoHeroe(this.heroe.nombre,'Héroe guardado exitosamente')
      },
      (ex: any) => {
        console.log(ex);
        this.swal.Error(ex.message);
      }
    );
  }
}
