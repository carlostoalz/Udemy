import { Error } from '../types/Error';
import { BaseError } from 'make-error'
import { ValidationError } from 'express-validator';
import { MulterError } from 'multer';

export const handleError = (error: BaseError | MulterError | ValidationError[] | string) : Error => {

    let wError: Error = new Error();

    if(!error) {
        return wError;
    }

    if (error instanceof MulterError) {
        if(error.message) {
            wError.mensaje = error.message;
        }

        if(error.stack) {
            wError.pila = error.stack;
        }

        if (wError.mensaje && wError.mensaje.trim() !== "") {
            return wError;
        }
    }
    
    if(error instanceof BaseError){

        if(error.message) {
            wError.mensaje = (<BaseError>error).message;
        }
    
        if(error.stack) {
            wError.pila = error.stack;
        }
        
        if (wError.mensaje && wError.mensaje.trim() !== "") {
            return wError;
        }
    }

    if ( Array.isArray(error) && (<ValidationError[]>error).length > 0) {
        wError.mensaje = (<ValidationError[]>error).map( (ve: ValidationError) => ve.msg ).join(', ');
        if (wError.mensaje && wError.mensaje.trim() !== "") {
            return wError;
        }
    }

    if (error !== "") {
        wError.mensaje = error as any;
        return wError;
    }

    return wError;
};
    