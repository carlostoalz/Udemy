import { IHabitacionState } from '../../interfaces/IHabitacionState';
import { IAction } from '../../interfaces/IAction';
import { 
    OBTENER_HABITACIONES,
    OBTENER_HABITACIONES_EXITO,
    OBTENER_HABITACIONES_ERROR,
} from '../types/index';

const initialState: IHabitacionState = {
    loading: false,
    error: null
}

export default (state: IHabitacionState = initialState, action: IAction) => {
    switch (action.type) {
        case OBTENER_HABITACIONES:
            return {
                ...state,
                loading: action.payload
            };    
        case OBTENER_HABITACIONES_EXITO:
            return {
                ...state,
                habitaciones: action.payload,
                loading: false
            };
        case OBTENER_HABITACIONES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
