import { Observable } from 'rxjs';

export interface IServiceCRUD<T> {
    get( query: string ) : Observable<any>;

    getOne( query: string ): Observable<any>;

    post( query: string, value: T ) : Observable<any>;

    put( query: string, value: T ) : Observable<any>;

    delete( query: string ) : Observable<any>;
}