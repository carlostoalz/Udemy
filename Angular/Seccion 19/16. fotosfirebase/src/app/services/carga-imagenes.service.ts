import { Injectable } from '@angular/core';

import { IImagen } from '../interfaces/IImage';
import { FileItem } from '../models/fileItem';

import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES: string = 'img'; 
  constructor( private db: AngularFirestore ) { }

  cargarImagenesFirebase( imagenes: FileItem[] ) {
    const storageRef = firebase.storage().ref();
    for ( const item of imagenes ) {

      item.estaSubiendo = true;

      if ( item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                                                      .put( item.archivo );

      uploadTask.on( firebase.storage .TaskEvent.STATE_CHANGED,

        ( snapshot: firebase.storage.UploadTaskSnapshot ) => item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,

        ( error ) => console.error( 'Error al subir', error ),

        () => {
          console.log('Imagen cargada correctamente');
          item.estaSubiendo = false;
        }
      );

      uploadTask.then(
        ( uploadSnapshot: firebase.storage.UploadTaskSnapshot ) => {

          uploadSnapshot.ref.getDownloadURL().then(
            (downloadURL: string) => {

              item.url = downloadURL;
              this.guaradarImagen( { nombre: item.nombreArchivo, url: item.url } );
              
            }
          );

        }
      );
    }
  }

  private guaradarImagen( imagen: IImagen ) {
    this.db.collection<IImagen>(`/${ this.CARPETA_IMAGENES }`).add( imagen );
  }
}
