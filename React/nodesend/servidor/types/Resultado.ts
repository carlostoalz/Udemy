import { IResultado } from '../interfaces/IResultado';
import { Error } from './Error';

export class RSV<T> implements IResultado<T> {
    public datos!: T;
    public exitoso!: boolean;
    public status!: number;
    public mensajeUsuario!: string;
    public error!: Error;
    public token!: string;
}