import { Component, OnInit } from '@angular/core';
import { HospitalService, ModalUploadService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { SwalUtil } from '../../utils/swal.util';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public swal: SwalUtil = new SwalUtil();
  public cargando: boolean = true;


  constructor(
    public _hs: HospitalService,
    public _ms: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarHospitales();

    this._ms.notification
    .subscribe(
      () => this.cargarHospitales(),
      err => this.swal.Errors( err )
    );

  }

  cargarHospitales() {

    this.cargando = true;

    this._hs.get( 'hospital' )
    .subscribe( 
      hospitales => {
        this.hospitales = hospitales;
        this.cargando = false;
      },
      err => this.swal.Errors( err )
    );

  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hs.get( `busqueda/coleccion/hospitales/${ termino }` )
    .subscribe(
      ( hospitales: any ) => {
        this.hospitales = hospitales;
        this.cargando = false;
      },
      err => this.swal.Errors( err )
    );

  }

  crearHospital() {

    this.swal.InputText( 'Crear Hospital', 'Ingrese el nombre del hospital.' )
    .then( ( sar: SweetAlertResult ) => {

      if ( sar && sar.dismiss && sar.dismiss === Swal.DismissReason.cancel ) {
        return;
      }

      if( !sar || sar === undefined || !sar.value || (<string>sar.value).length === 0 ){
        
        this.swal.Alerta('Parametro no ingresado', 'Debe ingresar el nombre del hospital');
        return;

      }

      this._hs.post( `hospital`, new Hospital( sar.value ) )
      .subscribe(
        () => this.cargarHospitales(),
        err => this.swal.Errors( err )
      );

    });

  }

  guardarHospital( hospital: Hospital ) {

    this._hs.put( `/hospital/${ hospital._id }`, hospital )
    .subscribe(
      () => {},
      err => this.swal.Errors( err )
    );

  }

  borrarHospital( hospital: Hospital ) {

    this.swal.Pregunta('¿Está seguro?', `Esta a punto de borrar a ${ hospital.nombre }`)
    .then( ( dialogResult: SweetAlertResult ) => {

      if ( dialogResult.value ) {

        this._hs.delete( `hospital/${ hospital._id }` )
        .subscribe(
          ( borrado: boolean ) => this.cargarHospitales(),
          err => this.swal.Errors( err )
        );

      }

    });

    this._hs.delete( `` )

  }

  actualizarImagen( hospital: Hospital ) {
    
    this._ms.mostrarModal( 'hospitales', hospital._id );

  }

}
