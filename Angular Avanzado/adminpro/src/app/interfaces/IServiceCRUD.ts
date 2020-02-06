import { Observable } from 'rxjs';

export interface IServiceCRUD<T> {
    getQuery( query:string ) : Observable<any>;

    postQuery( query: string, value: T, token?: string ) : Observable<any>;

    putQuery( query: string, value: T, token: string ) : Observable<any>;

    deleteQuery( query: string, token: string ) : Observable<any>;
}