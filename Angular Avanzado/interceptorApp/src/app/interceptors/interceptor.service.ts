import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers: HttpHeaders = new HttpHeaders({
      'token-usuario' : 'ABC2kjefhqp4h9q3uth9guhq9ughq3095ugh9'
    });

    const reqCLone = req.clone( { headers } );

    
    return next.handle( reqCLone )
    .pipe(
      catchError( err => this.manejarError(err))
    );

  }

  private manejarError( error: HttpErrorResponse ) {

    console.error(error);
    return throwError( error );

  }
  
}
