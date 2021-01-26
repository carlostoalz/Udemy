import { 
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    LIMPIAR_ALERTA
} from '../types/index';
import { IAction } from '../../interfaces/IAction';
import { IArchivoState } from '../../interfaces/IArchivoState';

const initialState: IArchivoState = {
    loading: false,
    error: null,
    mensaje: ''
};

const archivoReducer = (state: IArchivoState = initialState, action: IAction) => {
    switch (action.type) {
        case SUBIR_ARCHIVO:
            return {
                ...state,
                loading: action.payload
            };
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                archivo: action.payload,
                loading: false
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case LIMPIAR_ALERTA:
            return {
                ...state,
                error: null,
                mensaje: ''                
            };
        default:
            return state;
    }
}

export default archivoReducer;