import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre:string = "Carlos";
  nombre2:string = "caRLos anDRes toBOn alZAte";
  arreglo:number[] = [0,1,2,3,4,5,6,7,8,9,10];
  PI:number = Math.PI;
  a:number = 0.234;
  salario:number = 3100000;
  heroe:any = {
    nombre: "Logan",
    clave: "Wolverine",
    edad: 500,
    direccion:{
      calle: "40C",
      carrera: "58C",
      casa:"20",
      barrio: "Los Bucaros 2",
      comuna: "Santa Ana",
      municipio:"Bello",
      departamento: "Antioquia",
      pais: "Colombia",
      continente: "America"
    }
  };
  valorDePromesa = new Promise((resolve,reject) =>{
    setTimeout(() => {
      return resolve("LLego la data.");
    },3500);
  });
  fecha:Date = new Date();
  video:string = "F_mhWxOjxp4";
  activar:boolean = true;
}
