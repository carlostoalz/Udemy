import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';
import { SwalUtil } from 'src/app/utils/swal.util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  swal: SwalUtil = new SwalUtil();
  elemento: HTMLElement;

  constructor(public _cs: ChatService) { 
    this._cs.cargarMensajes().subscribe( () =>{
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;        
      }, 20);
    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje(){
    console.log(this.mensaje);
    if (this.mensaje === null || this.mensaje === undefined || this.mensaje.trim().length === 0) {
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
    .then((data: any)=> {
      this.mensaje = null;
    })
    .catch( (ex: any) => {
      // this.swal.Error(ex.message);
      console.log(ex);
    });
  }

}
