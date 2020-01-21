import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada: boolean = true;
  @ViewChild( IonList,{static:true} ) lista: IonList;

  constructor(public _deseosService: DeseosService,
              private _router: Router,
              private _alertCtrl:AlertController) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ){
    if (this.terminada) {
      this._router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`); 
    }else{
      this._router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista( lista: Lista ){
    this._deseosService.borrarLista(lista);
  }

  async editarLista( lista: Lista ){
    const alert = await this._alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: ( data ) => {
            if(data.titulo !== undefined && 
               data.titulo !== null && 
               data.titulo.length > 0){
                lista.titulo = data.titulo;
                this._deseosService.guardarStorage();
                this.lista.closeSlidingItems();
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
