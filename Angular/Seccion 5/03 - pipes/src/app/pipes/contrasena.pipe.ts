import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: string, mostrar:boolean = true): string {
    let valueIni:string = value;
    if (mostrar) {
      value = "";
      for(let i = 0; i < valueIni.length; i++){
        value += "*";
      }
    }
    return value;
  }

}
