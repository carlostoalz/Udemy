import { 
    OBTENER_PROPIEDADES,
    OBTENER_PROPIEDADES_EXITO,
    OBTENER_PROPIEDADES_ERROR
} from '../types/index';
import { IPropiedadState } from '../../interfaces/IPropiedadState';
import { IAction } from '../../interfaces/IAction';

const initialState: IPropiedadState = {
    loading: false,
    error: null
};

export default (state: IPropiedadState = initialState, action: IAction) => {
    switch (action.type) {
        case OBTENER_PROPIEDADES:
            return {
                ...state,
                loading: action.payload
            };
        case OBTENER_PROPIEDADES_EXITO:
            return {
                ...state,
                propiedades: action.payload,
                loading: false
            };
        case OBTENER_PROPIEDADES_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}