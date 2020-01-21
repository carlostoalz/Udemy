import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public _deseosService:DeseosService,
              private _router:Router,
              private _alertCtrl:AlertController) {}

  async agregarLista() {
    const alert = await this._alertCtrl.create({
      header: 'Nueva lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) => {
            if(data.titulo !== undefined && 
               data.titulo !== null && 
               data.titulo.length > 0){
                this._router.navigateByUrl(`/tabs/tab1/agregar/${this._deseosService.crearLista(data.titulo)}`);
            }else{
              return;
            }
          }
        }
      ]
    });

    alert.present();
  }
}
