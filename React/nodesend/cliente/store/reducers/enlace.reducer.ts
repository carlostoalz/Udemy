import { 
    CREAR_ENLACE,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    OBTENER_ENLACE,
    OBTENER_ENLACE_EXITO,
    OBTENER_ENLACE_ERROR,
    OBTENER_ENLACES,
    OBTENER_ENLACES_EXITO,
    OBTENER_ENLACES_ERROR,
    LIMPIAR_ENLACE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS,
    VERIFICAR_PASSWORD,
    VERIFICAR_PASSWORD_EXITO,
    VERIFICAR_PASSWORD_ERROR
} from '../types/index';
import { IEnlaceState } from '../../interfaces/IEnlaceState';
import { IAction } from '../../interfaces/IAction';

const initialState: IEnlaceState = {
    loading: false,
    error: null,
    mensaje: '',
    password: '',
    descargas: 1
};

const enlaceReducer = (state: IEnlaceState = initialState, action: IAction) => {
    switch (action.type) {
        case CREAR_ENLACE:
        case OBTENER_ENLACE:
        case OBTENER_ENLACES:
        case VERIFICAR_PASSWORD:
            return {
                ...state,
                loading: action.payload
            };
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                enlace: action.payload,
                loading: false,
                mensaje: '',
                password: '',
                descargas: 1,
                passwordResponse: null
            };
        case OBTENER_ENLACES_EXITO:
            return {
                ...state,
                enlaces: action.payload,
                loading: false
            };
        case OBTENER_ENLACE_EXITO:
            return {
                ...state,
                loading: false
            }
        case VERIFICAR_PASSWORD_EXITO:
            return {
                ...state,
                loading: false,
                passwordResponse: action.payload
            };
        case CREAR_ENLACE_ERROR:
        case OBTENER_ENLACE_ERROR:
        case OBTENER_ENLACES_ERROR:
        case VERIFICAR_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case LIMPIAR_ENLACE: 
            return {
                ...state,
                enlace: null,
                enlaces: null,
                loading: false,
                error: null,
                mensaje: '',
                passwordResponse: null
            };
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            };
        default:
            return state;
    }
}

export default enlaceReducer;