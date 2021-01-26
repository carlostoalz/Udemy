import { IError } from '../interfaces/IError';
import { IRSV } from '../interfaces/IRSV';

export const handleError = (error: any) => {
    
    let wError: IError = {
        mensaje: '',
        pila: ''
    };

    if(!error) {
        return wError;
    }

    if (error.response) {
        if (error.response.data !== "") {
            wError.mensaje = error.response.data;
            return wError;
        }

        if (isIRSV(error.response.data)) {
            wError.mensaje = error.response.data.error.mensaje;
            wError.pila = error.response.data.error.pila;
            return wError;
        }
        else {
            wError.mensaje = error.response.data.msg;
            return wError;
        }
    }

    if (error instanceof Error) {
        wError.mensaje = error.message
        wError.pila =  error.stack ? error.stack : '';
        return wError;
    }

    if (isIError(error)) {
        wError.mensaje = error.mensaje;
        wError.pila = error.pila;
        return wError;
    }

    return wError;

}

const isIError = ( error: any ) : error is IError => {
    return (<IError>error).mensaje !== undefined && (<IError>error).mensaje !== null;
}

const isIRSV = (data: any) : data is IRSV<any> => {
    return (<IRSV<any>>data).error.mensaje !== undefined && (<IRSV<any>>data).mensajeUsuario !== null
}