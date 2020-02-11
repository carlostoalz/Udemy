import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { SwalUtil } from '../../utils/swal.util';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  swal: SwalUtil = new SwalUtil();

  constructor(
    public _us: UsuarioService
  ) {
    
    this.usuario = this._us.usuario;

  }

  ngOnInit() {
  }

  guardar ( usuario: Usuario ) {
    
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    usuario.role = "USER_ROLE";

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._us.put( `/usuario/${ this.usuario._id }`, usuario )
    .subscribe(
      res => res,
      err => this.swal.Errors( err )
    );
    
  }

  seleccionImagen ( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    
    if ( archivo.type.indexOf('image') < 0 ) {
      this.swal.Alerta('Solo Imagenes', 'El archivo seleccionado no es una imagen');
      return;
    }

    this.imagenSubir = archivo;

    let reader: FileReader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = <string>reader.result;

  }

  cambiarImagen () {
    this._us.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
