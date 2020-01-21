import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { SwalUtil } from 'src/app/utils/swal.util';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  swalUtil: SwalUtil;
  recordarme: boolean = false;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.swalUtil = new SwalUtil();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.swalUtil.mostrarLoading();

    this.auth.singUp(this.usuario).subscribe(
      (data: any) => {
        console.log(data);
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      },
      (ex: any) => {
        this.swalUtil.mostrarMenssaje('Error al registrar', null, true, ex.error.error.message);
      }
    );
  }
}
