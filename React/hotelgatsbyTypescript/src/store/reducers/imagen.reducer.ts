import { 
    OBTENER_IMAGEN_HOTEL, 
    OBTENER_IMAGEN_HOTEL_EXITO,
    OBTENER_IMAGEN_HOTEL_ERROR 
} from '../types'
import { IImagenState } from '../../interfaces/IImagenState';
import { IAction } from '../../interfaces/IAction';

const initialState: IImagenState = {
    src: { srcSetWebp: "" },
    loading: false,
    error: null
};

export default (state: IImagenState = initialState, action: IAction) => { 
    switch (action.type) {
        case OBTENER_IMAGEN_HOTEL:
            return {
                ...state,
                loading: action.payload
            };   
        case OBTENER_IMAGEN_HOTEL_EXITO:
            return {
                ...state,
                loading: false,
                src: action.payload
            };
        case OBTENER_IMAGEN_HOTEL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

