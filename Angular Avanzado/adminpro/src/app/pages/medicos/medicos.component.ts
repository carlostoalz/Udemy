import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { SwalUtil } from '../../utils/swal.util';
import { Medico } from '../../models/medico.model';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  private swal: SwalUtil
  public medicos: Medico[] = [];
  public cargando: boolean = true;

  constructor(
    public _ms: MedicoService
  ) { }

  ngOnInit() {

    this.cargarMedicos();

  }

  cargarMedicos(){

    this.cargando = true;

    this._ms.get( 'medico' )
    .subscribe(
      (medicos: Medico[]) => {
        this.medicos = medicos;
        this.cargando = false;
      }
    );
  }

  buscarMedico( termino: string ) {
    
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._ms.get( `busqueda/coleccion/medicos/${ termino }` )
    .subscribe(
      ( medicos: any ) => {
        this.medicos = medicos;
        this.cargando = false;
      }
    );

  }

  borrarMedico( medico: Medico ) {
    
    this.swal.Pregunta( '¿Está seguro?', `Esta a punto de borrar a ${ medico.nombre }` )
    .then( ( dialogResult: SweetAlertResult ) => { 

      if ( dialogResult.value ) {

        this._ms.delete( `mdeico/${ medico._id }` )
        .subscribe(
          ( borrado: boolean ) => this.cargarMedicos()
        );

      }
      
    })
    .catch( err => this.swal.Errors( err ) );

  }

}
