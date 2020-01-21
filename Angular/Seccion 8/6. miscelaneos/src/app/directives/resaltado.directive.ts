import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { strictEqual } from 'assert';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(private _elementRef: ElementRef) { }

  @Input("appResaltado") nuevoColor: string;

  @HostListener('mouseenter')
  mouseEnter() {
    this.resaltar(this.nuevoColor || "yellow");
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.resaltar(null);
  }

  private resaltar( color: string ){
    this._elementRef.nativeElement.style.backgroundColor = color;
  }
}
