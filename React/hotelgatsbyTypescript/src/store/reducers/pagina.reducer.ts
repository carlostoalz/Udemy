import { 
    OBTENER_PAGINA,
    OBTENER_PAGINA_EXITO,
    OBTENER_PAGINA_ERROR
} from '../types/index';
import { IPaginaState } from '../../interfaces/IPaginaState';
import { IAction } from '../../interfaces/IAction';

const initialState: IPaginaState = {
    loading: false,
    error: null
};

export default (state: IPaginaState = initialState, action: IAction) => {
    switch (action.type) {
        case OBTENER_PAGINA:
            return {
                ...state,
                loading: action.payload
            };
        case OBTENER_PAGINA_EXITO:
            return {
                ...state,
                pagina: action.payload,
                loading: false
            };
        case OBTENER_PAGINA_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

