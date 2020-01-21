import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  template: `
    <p [style.fontSize.px]="tamano">
      Hola mundo... Esta es una etiqueta.
    </p>

    <button class="btn btn-primary" (click)="tamano = tamano + 5">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button>
    <button type="button" class="btn btn-danger" (click)="tamano = tamano - 5">
      <i class="fa fa-minus" aria-hidden="true"></i>
    </button>
  `,
  styles: []
})
export class NgStyleComponent implements OnInit {
  
  tamano:number = 10;

  constructor() { }

  ngOnInit() {
  }

}
