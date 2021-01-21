import {
    OBTENER_PAGINA_INICIO,
    OBTENER_PAGINA_INICIO_EXITO,
    OBTENER_PAGINA_INICIO_ERROR
} from '../types';
import { IPaginaState } from '../../interfaces/IPaginaState';
import { IAction } from '../../interfaces/IAction';

const initialState: IPaginaState = {
    loading: false,
    error: null
};

export default (state: IPaginaState = initialState, action: IAction) => {
    switch (action.type) {
        case OBTENER_PAGINA_INICIO:
            return {
                ...state,
                loading: action.payload
            };
        case OBTENER_PAGINA_INICIO_EXITO:
            return {
                ...state,
                pagina: action.payload,
                loading: false
            };
        case OBTENER_PAGINA_INICIO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}