import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string;

  constructor( private _deseosService: DeseosService,
               private _activatedRoute: ActivatedRoute) {
                 const listaId :number = Number(_activatedRoute.snapshot.paramMap.get('listaID'));
                 this.lista = _deseosService.obtenerLista(listaId);
                }

  ngOnInit() {
  }

  agregarItem(){
    if(this.nombreItem !== undefined &&
       this.nombreItem !== null &&
       this.nombreItem.length > 0){
        const nuevoItem: ListaItem = new ListaItem(this.nombreItem);
        this.lista.items.push(nuevoItem);
        this.nombreItem = '';
        this._deseosService.guardarStorage();
       }else {
         return;
       }
  }

  cambioCheck( item : ListaItem ){
    const pendientes = this.lista.items.filter( itemData => !itemData.completado).length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;      
    }else{
      this.lista.terminadaEn = null;
      this.lista.completada = false;      
    }

    this._deseosService.guardarStorage();
  }

  borrar( index: number ){
    this.lista.items.splice(index, 1);
    this._deseosService.guardarStorage();
  }
}