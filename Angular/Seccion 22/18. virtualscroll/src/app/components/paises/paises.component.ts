import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styles: []
})
export class PaisesComponent implements OnInit {
  
  public paises: any[] = [];

  constructor( private _ps: PaisesService ) { }

  ngOnInit() {
    this._ps.getPaises().subscribe(
      ( data: any[] ) => this.paises= data
    );
  }

  drop( event: CdkDragDrop<any> ){
    moveItemInArray( this.paises, event.previousIndex, event.currentIndex );
  }

}
