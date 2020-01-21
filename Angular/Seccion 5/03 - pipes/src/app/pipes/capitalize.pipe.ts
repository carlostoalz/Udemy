import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
    transform(value: string, todas:boolean = true): string {
        value = value.toLocaleLowerCase();
        let palabras:string[] = value.split(" ");
        if (todas) {
            for (let word in palabras) {
                palabras[word] = palabras[word][0].toUpperCase() + palabras[word].substr(1);
            }            
        }else{
            palabras[0] = palabras[0][0].toUpperCase() + palabras[0].substr(1);
        }
        return palabras.join(" ");
    }
}