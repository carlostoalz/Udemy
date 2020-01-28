import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', { static: true })  txtProgress: ElementRef;
  
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  cambiarValor( valor: number ){
    if (this.porcentaje >= 100 && valor > 0 ) {
      this.porcentaje = 100;
      return;
    }

    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + valor; 

    this.cambioValor.emit( this.porcentaje );
  }

  onChanges( newValue: number ) {

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if ( newValue <= 0 || newValue === undefined || newValue === null ) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    this.txtProgress.nativeElement.value = this.porcentaje;
    
    this.cambioValor.emit( this.porcentaje );

    this.txtProgress.nativeElement.focus();
    
  }

}
