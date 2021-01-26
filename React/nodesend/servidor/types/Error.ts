import { IError } from '../interfaces/IError';

export class Error implements IError {    
    public mensaje!: string;
    public pila!: string;
}