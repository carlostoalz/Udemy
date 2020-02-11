import { Component, OnInit } from '@angular/core';
import { SwalUtil } from '../../utils/swal.util';
import { SubirArchivoService, ModalUploadService } from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;
  private swal: SwalUtil = new SwalUtil();

  constructor(
    public _sa: SubirArchivoService,
    public _mu: ModalUploadService
  ) { }

  ngOnInit() {
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

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._mu.ocultarModal();
  }

  subirImagen() {

    this._sa.subirArchivo( this.imagenSubir, this._mu.tipo, this._mu.id )
    .then( resp => {

      this._mu.notification.emit( resp );
      this.cerrarModal();

    })
    .catch( err => this.swal.Errors( err ) );

  }

}
