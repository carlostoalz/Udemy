import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BusquedaService } from '../../services/service.index';
import { SwalUtil } from '../../utils/swal.util';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  private swal: SwalUtil = new SwalUtil();
  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public _bs: BusquedaService
  ) {

    this.activatedRoute.params
    .subscribe(
      ( params: Params ) => {
        
        let termino: string = params['termino'];
        this.buscar( termino );

      }
    )

    
  }

  ngOnInit() {
  }

  buscar( termino: string ) {

    this._bs.buscar( termino )
    .subscribe(
      resp => {

        this.usuarios = resp['usuarios'];
        this.hospitales = resp['hospitales'];
        this.medicos = resp['medicos'];

      },
      err => this.swal.Errors( err )
    )
  }

}
