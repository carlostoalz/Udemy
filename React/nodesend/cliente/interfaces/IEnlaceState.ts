import { IBaseState } from './IBaseState';
import { IEnlace } from './IEnlace';
import { IPasswordResponse } from './IPasswordResponse';

export interface IEnlaceState extends IBaseState {
    enlace?: IEnlace;
    enlaces?: IEnlace[];
    password: string;
    descargas: number;
    autor?: string;
    passwordResponse?: IPasswordResponse;
}