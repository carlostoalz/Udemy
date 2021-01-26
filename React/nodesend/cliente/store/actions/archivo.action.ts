import { Dispatch } from 'redux';
import { 
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
} from '../types/index';
import { handleError } from '../../common/handleError';
import { IAction } from '../../interfaces/IAction';
import { IError } from '../../interfaces/IError';
import { IEnlace } from '../../interfaces/IEnlace';
import { SubirArchivo } from '../../services/archivo.service';

export const subirArchivoAction = (acceptedFile: File) => {
    return async (dispatch: Dispatch) => {
        dispatch( subirArchivo() ); 

        try {
            const resultado = await SubirArchivo(acceptedFile);
            dispatch( subirArchivoExito({
                nombre: resultado.datos,
                nombre_original: acceptedFile.name
            }) );
        } catch (error) {
            error = handleError(error);
            dispatch( subirArchivoError(error) );
        }
    }
};

const subirArchivo = () => ({
    type: SUBIR_ARCHIVO,
    payload: true
} as IAction);

const subirArchivoExito = (archivo: IEnlace) => ({
    type: SUBIR_ARCHIVO_EXITO,
    payload: archivo
} as IAction);

const subirArchivoError = (error: IError) => ({
    type: SUBIR_ARCHIVO_ERROR,
    payload: error
} as IAction);