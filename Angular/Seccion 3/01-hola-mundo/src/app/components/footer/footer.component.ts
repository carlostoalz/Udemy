import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  nombre:string;
  anio:number;

  constructor(){
    this.nombre = "Carlos Andres Tobon Alzate";
    this.anio = new Date().getFullYear();
  }
}
