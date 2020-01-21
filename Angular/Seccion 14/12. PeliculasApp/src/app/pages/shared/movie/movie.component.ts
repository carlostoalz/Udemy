import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { SwalUtil } from 'src/app/utils/swal.util';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styles: []
})
export class MovieComponent implements OnInit {

  private swal: SwalUtil = new SwalUtil();
  pelicula: any;
  regresarA: string = "";
  busqueda: string = "";

  constructor(public _ps: PeliculasService,
              private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(
      parametros => {
        
        this.regresarA = parametros["pag"];

        if (parametros["busqueda"]) {
          this.busqueda = parametros["busqueda"]
        }

        this._ps.getPelicula(parametros["id"])
        .subscribe(
          data => this.pelicula = data,
          ex => this.swal.Error(ex.messaje)
        );
      }
    );
  }

  ngOnInit() {
  }

}
