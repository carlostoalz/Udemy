import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { SwalUtil } from 'src/app/utils/swal.util';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  
  private swal: SwalUtil = new SwalUtil();
  private parametro: string;
  buscar: string = "";

  constructor( public _ps: PeliculasService,
               private activatedRoute: ActivatedRoute) {
    this.parametro = this.activatedRoute.snapshot.paramMap.get('texto');
    if (this.parametro) {
      this.buscar = this.parametro;
      this.buscarPelicula();
    }
  }

  ngOnInit() {
    
  }

  buscarPelicula( ){
    if ( this.buscar.length === 0 ) {
      return;
    }

    this._ps.buscarPelicula( this.buscar )
    .subscribe(
      data => data,
      ex => this.swal.Error(ex["message"])
    );
  }

}
