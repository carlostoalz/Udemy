import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Mensaje } from '../interfaces/mensaje.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( (user: firebase.User) => {
      console.log('Estado del usuario: ',user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    },
    (ex: any) => console.log(ex));
  }

  cargarMensajes(): Observable<Mensaje[]>{

    this.chatsCollection = this.afs.collection<Mensaje>
    ('chats', ref => ref.orderBy('fecha','desc')
    .limit(5));

    return this.chatsCollection.valueChanges()
    .pipe(
      map( (mensajes: Mensaje[]) => {
        this.chats = [];

        for (const mensaje of mensajes) {
          this.chats.unshift( mensaje );
        }
        
        return mensajes;
      })
    );
  }

  agregarMensaje(texto: string): Promise<DocumentReference>{
      // TODO falta el UID del usuario 
      let mensaje: Mensaje = {
      nombre : this.usuario.nombre,
      mensaje : texto,
      fecha : new Date().getTime(),
      uid: this.usuario.uid
    }

      return this.chatsCollection.add(mensaje);
  }

  login(proveedor: string) {
    if (proveedor === 'google') {      
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }
}
