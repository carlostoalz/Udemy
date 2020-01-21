import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { SwalUtil } from 'src/app/utils/swal.util';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PaisModel } from 'src/app/models/pais.model';
import { GeneroModel } from 'src/app/models/genero.model';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  paises: PaisModel[] = [];
  swalUtil: SwalUtil = new SwalUtil();
  generos: GeneroModel[] = [
    {genero: 'Masculino', sigla: 'M'},
    {genero: 'Femenino', sigla: 'F'},
    {genero: 'Sin Definir', sigla: 'S'}
  ];

  constructor(private formService: FormService) { 
    formService.traerPaises().subscribe(
      (paises: any) => {
        this.paises = paises;
      },
      (ex: any) => {
        this.swalUtil.mostrarError(ex.message)
      }
    );
  }

  ngOnInit() {
  }

  guardar(forma: NgForm) {
    console.log('NgForm :', forma);
    console.log('Valor forma :', forma.value);
    console.log('Usuario :', this.usuario);
  }
}
