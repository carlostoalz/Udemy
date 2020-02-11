import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services/service.index';
import { SwalUtil } from '../../utils/swal.util';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  
  swal: SwalUtil = new SwalUtil();

  constructor( 
    public _us: UsuarioService,
    public _mu: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._mu.notification
    .subscribe(
      resp => this.cargarUsuarios(),
      err => this.swal.Errors( err )
    );
  }

  cargarUsuarios() {

    this.cargando = true;

    this._us.get( `usuario?desde=${ this.desde }` )
    .subscribe( 
      (resp: any ) => {
        
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;

      },
      err => this.swal.Errors(err)
    );

  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros || desde < 0 ) {      
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario ( termino: string ) {

    if ( termino === undefined || termino === null || termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._us.get(`busqueda/coleccion/usuarios/${ termino }`)
    .subscribe( 
      (resp: any) => {
        this.usuarios = resp.usuarios;
        this.cargando = false;
      },
      err => this.swal.Errors(err)
    );

  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this._us.usuario._id ) {
      this.swal.Alerta('No se puede borrar usuario', 'No se puede borrar a si mismo');
      return;
    }

    this.swal.Pregunta('¿Está seguro?', 'Está a punto de borrar a ' + usuario.nombre)
    .then( ( dialogResult: SweetAlertResult ) => {
      
      if( dialogResult.value ) {

        this._us.delete( `usuario/${ usuario._id }` )
        .subscribe(
          ( borrado: boolean) => this.cargarUsuarios(),
          err => this.swal.Errors( err )
        );

      }

    });

  }

  guardarUsuario( usuario: Usuario ) {

    this._us.put( `/usuario/${ usuario._id }`, usuario )
    .subscribe(
      resp => resp,
      err => this.swal.Errors( err )
    );

  }

  mostrarModal( id: string ) {
    this._mu.mostrarModal( 'usuarios', id );
  }

}
