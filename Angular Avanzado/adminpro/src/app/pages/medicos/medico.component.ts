import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService, ModalUploadService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { SwalUtil } from '../../utils/swal.util';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public hospital: Hospital = new Hospital('');
  public swal: SwalUtil = new SwalUtil();
  public medico: Medico = new Medico('', '', '', '', '');

  constructor(
    public _ms: MedicoService,
    public _hs: HospitalService,
    public _mus: ModalUploadService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ) {
    let id: string = this.ativatedRoute.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {
      
      this.cargarMedico( id );

    }
  }

  ngOnInit() {

    this.cargarHospitales();

    this._mus.notification
    .subscribe( resp =>  {
      this.medico.img = (<Medico>resp['medico']).img;
    },
    err => this.swal.Errors(err))

  }

  cargarHospitales() {

    this._hs.get( 'hospital' )
    .subscribe( 
      hospitales => {
        this.hospitales = hospitales;
      },
      err => this.swal.Errors( err )
    );

  }

  cargarMedico( id: string ) {
    
    this._ms.getOne( `medico/${ id }` )
    .subscribe(
      medico => {
        this.medico = medico;
        this.medico.hospital = medico['hospital']['_id'];
        this.cambioHospital( this.medico.hospital );
      },
      err => this.swal.Errors( err )
    );

  }

  guardarMedico( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    let observable: Observable<any> = null;

    if ( this.medico._id ) {
      //actualizando
      observable = this._ms.put( `medico/${ this.medico._id }`, this.medico );
    } else {
      //creando
      observable = this._ms.post( 'medico', this.medico );
    }

    observable.subscribe(
      ( medico ) => {
        this.medico._id = medico._id;        
        this.router.navigate(['/medico', medico._id]);      
      },
      err => this.swal.Errors( err )
    );

  }

  cambioHospital( id: string ) {

    this._hs.getOne( `hospital/${ id }` )
    .subscribe(
      hospital => this.hospital = hospital,
      err => this.swal.Errors( err )
    );  

  }

  cambiarFoto() {

    this._mus.mostrarModal( 'medicos', this.medico._id )

  }

}
