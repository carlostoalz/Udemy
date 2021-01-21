import { 
    OBTENER_LOGO,
    OBTENER_LOGO_EXITO,
    OBTENER_LOGO_ERROR,
    OBTENER_BANNER,
    OBTENER_BANNER_EXITO,
    OBTENER_BANNER_ERROR,
    OBTENER_ICONOS,
    OBTENER_ICONOS_EXITO,
    OBTENER_ICONOS_ERROR
} from '../types/index';
import { IImagenState } from '../../interfaces/IImagenState';
import { IAction } from '../../interfaces/IAction';

const initialState: IImagenState = {
    loading: false,
    error: null
};

export default (state: IImagenState = initialState, action: IAction) => {
    switch (action.type) {
        case OBTENER_LOGO:
        case OBTENER_BANNER:
        case OBTENER_ICONOS:
            return {
                ...state,
                loading: action.payload
            };
        case OBTENER_LOGO_EXITO:
            return {
                ...state,
                logo: action.payload,
                loading: false
            };
        case OBTENER_BANNER_EXITO:
            return {
                ...state,
                banner: action.payload,
                loading: false
            };
        case OBTENER_ICONOS_EXITO:
            return {
                ...state,
                iconos: action.payload,
                loading: false
            }
        case OBTENER_LOGO_ERROR:
        case OBTENER_BANNER_ERROR:
        case OBTENER_ICONOS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}