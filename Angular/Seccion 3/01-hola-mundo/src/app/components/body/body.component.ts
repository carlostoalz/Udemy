import { Component } from '@angular/core';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html'
})
export class BodyComponent{
    mostrar:boolean;
    personajes:string[];

    frase:any = {
        mensaje: 'Un gran poder requiere una gran responsabilidad.',
        autor: 'Ben Parker'
    };

    constructor() {
        this.mostrar = true;
        this.personajes = ['Spiderman', 'Venom', 'Dr. Octopus'];
    }
}