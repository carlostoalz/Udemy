import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { SwalUtil } from '../utils/swal.util';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  swal: SwalUtil = new SwalUtil();

  transform( img: string, tipo: string = 'usuario'): string {

    let url = `${ URL_SERVICIOS }/img`;

    if ( !img ) {
      return `${url}/usuarios/xxx`;
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    if ( tipo ) {
      
    }

    switch( tipo ) {

      case 'usuario': 
         url = `${ url }/usuarios/${ img }`;
         break;
         
      case 'hospital': 
         url = `${ url }/hospitales/${ img }`;
         break;
         
      case 'medico': 
         url = `${ url }/medeicos/${ img }`;
         break;
         
      default: 
         this.swal.Alerta( 'Tipo de imagen no existe', 'Solo se permiten los tipos [ usuario, hospital, medico ]' );
         url = `${url}/usuarios/xxx`;
        break;

    }

    return url;
  }

}
