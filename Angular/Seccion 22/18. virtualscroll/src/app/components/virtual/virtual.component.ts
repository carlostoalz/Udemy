import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styles: []
})
export class VirtualComponent implements OnInit {

  @ViewChild( CdkVirtualScrollViewport, { static: true } ) viewport: CdkVirtualScrollViewport;

  personas = Array(500).fill(0);

  constructor() { }

  ngOnInit() {
  }

  irFinal() {
    this.viewport.scrollToIndex( this.personas.length );
  }

  irMedio() {
    this.viewport.scrollToIndex( Math.round( this.personas.length / 2 ) );
  }

  irInicio() {
    this.viewport.scrollToIndex( 0 );
  }

}
