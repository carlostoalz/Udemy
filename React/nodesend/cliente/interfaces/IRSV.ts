import { IError } from './IError';
export interface IRSV<T> {
    datos: T;
    exitoso: boolean;
    status: number;
    mensajeUsuario: string;
    error: IError;
    token: string;
}