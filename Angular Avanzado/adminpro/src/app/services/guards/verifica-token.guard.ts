import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { SwalUtil } from '../../utils/swal.util';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  
  private swal: SwalUtil = new SwalUtil();

  constructor(
    public _us: UsuarioService,
    public router: Router
  ) {}
  
  canActivate(): Promise<boolean> | boolean {
    
    let token: string = this._us.token;
    let payload: any = JSON.parse( atob( token.split( '.' )[1] ) );

    let expirado: boolean = this.expirado( payload.exp );

    if ( expirado ) {
      this.swal.Alerta( 'Token expiró', 'Debe loguearse nuevamente' );
      this.router.navigate(['/login']);
      return false;
    }

    console.log( payload );

    return this.verificaRenueva( payload.exp );

  }

  private verificaRenueva( fechaExp: number ) : Promise<boolean> {

    return new Promise( ( resolve, reject ) => {

      let tokenExp: Date = new Date( fechaExp * 1000 );
      let ahora: Date = new Date();

      ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000 ) );

      if ( tokenExp.getTime() > ahora.getTime() ) {

        resolve( true );
        
      } else {

        this._us.renuevaToken()
        .subscribe(
          () => resolve(true),
          () => reject(false)
        );

      }

    });

  }

  private expirado( fechaExp: number ) {

    let ahora: number = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }

  }
  
}
