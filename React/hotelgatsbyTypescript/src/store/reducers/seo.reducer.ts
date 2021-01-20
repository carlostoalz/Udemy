import { ISEOState } from '../../interfaces/ISEOState';
import { IAction } from '../../interfaces/IAction';
import { 
    OBTENER_SEO,
    OBTENER_SEO_EXITO,
    OBTENER_SEO_ERROR
} from '../types/index';

const initialState: ISEOState = {
    loading: false,
    error: null
};

export default (state: ISEOState = initialState, action: IAction) => {
    switch (action.type) {
        case OBTENER_SEO:
            return {
                ...state,
                loading: action.payload
            };
        case OBTENER_SEO_EXITO:
            return {
                ...state,
                SEO: action.payload,
                loading: false
            };
        case OBTENER_SEO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}