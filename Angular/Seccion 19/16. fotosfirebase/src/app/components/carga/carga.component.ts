import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/fileItem';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreElemento: boolean = false;
  archivos: FileItem[] = [];

  constructor( public _cis: CargaImagenesService ) { }

  ngOnInit() {
  }
  
  cargarImagenes(){
    this._cis.cargarImagenesFirebase( this.archivos );
  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
