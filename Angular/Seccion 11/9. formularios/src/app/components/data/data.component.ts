import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;
  usuario: any = {
    nombreCompleto: {
      nombre: "Carlos Andres",
      apellido: "Tobon Alzate"
    },
    email: "carlostoalz@gmail.com",
    pasatiempos : []
  };

  constructor() {
    this.forma = new FormGroup({
      'nombreCompleto': new FormGroup({
        'nombre': new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        'apellido': new FormControl('', [
          Validators.required,
          this.noAlzate
        ])
      }),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]),
      'pasatiempos': new FormArray([
        new FormControl('', Validators.required)
      ]),
      'username' : new FormControl('', Validators.required, this.existeUsuario),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);

    // this.forma.setValue( this.usuario );

    this.forma.controls['username'].valueChanges
      .subscribe( (data: any) => {
        console.log(data);
      },
      (ex: any) => {
        console.log(ex);
      });

    this.forma.controls['username'].statusChanges
      .subscribe( (data: any) => {
        console.log(data);
      },
      (ex: any) => {
        console.log(ex);
      });
  }

  ngOnInit() {
  }

  agregarPasatiempo() {
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  noAlzate(control: FormControl): { [s: string]: boolean } {
    if ((<string>control.value).toUpperCase().includes("ALZATE")) {
      return {
        noAlzate: true
      }
    }
    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    let form: any = this;

    if ((<string>control.value) !== (<string>form.controls['password1'].value)) {
      return {
        noIguales: true
      }
    }
    return null;
  }

  existeUsuario( control: FormControl ) : Promise<any> | Observable<any> {
    let promesa: Promise<any> = new Promise<any>(
      (resolve: any,reject: any) => {
        setTimeout(() => {
          if (control.value === "strider") {
            resolve( { existe: true } );
          } else {
            resolve( null );
          }
        },3000);
      }
    );

    return promesa;
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);

    // this.forma.reset();
  }
}
