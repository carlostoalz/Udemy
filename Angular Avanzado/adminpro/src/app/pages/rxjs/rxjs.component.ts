import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcription: Subscription;

  constructor() { 

    this.subcription = this.regresaObservable()
    // .pipe(
    //   retry(2)
    // )
    .subscribe( 
      numero => console.log( 'Subs', numero ),
      error => console.error( 'Error en el obs', error ),
      () => console.log('El observador termino!')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable<any>( (observer: Subscriber<any>) => {
      let contador: number = 0;
      let intervalo: NodeJS.Timer = setInterval( () => {
        contador ++;

        const salida = {
          valor: contador
        }

        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
        
        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error( 'Auxilio!' );
        // }
      }, 1000 );
    }).pipe(
      map( resp => resp['valor']),
      filter( ( valor, index ) => {

        if ( (valor % 2) > 0 ) {
          //impar
          return true;
        } else {
          //par
          return false;
        }
      })
    );
  }

}
