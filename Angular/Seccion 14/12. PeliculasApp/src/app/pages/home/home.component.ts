import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { SwalUtil } from 'src/app/utils/swal.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  private swal: SwalUtil = new SwalUtil();
  public cartelera: any[];
  public populares: any[];
  public popularesNinos: any[];

  constructor(public _ps: PeliculasService) { 
    this._ps.getCartelera()
    .subscribe(
      (data: any) => this.cartelera = data,
      ex => this.swal.Error(ex.message)
    );

    this._ps.getPopulares()
    .subscribe(
      (data: any) => this.populares = data,
      ex => this.swal.Error(ex.message)
    );

    this._ps.getPopularesNinos()
    .subscribe(
      (data: any) => this.popularesNinos = data,
      ex => this.swal.Error(ex.message)
    );
  }

  ngOnInit() {  }

}
