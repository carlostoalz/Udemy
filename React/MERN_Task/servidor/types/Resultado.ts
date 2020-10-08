import { Error } from './Error';
import { IResultado } from '../interfaces/IResultado';

export class RSV<T> implements IResultado<T> {
    constructor() {}

    public datos: T;
    public exitoso: boolean;
    public status: number;
    public mensajeUsuario: string;
    public error: Error;
    public token: string;
    
}