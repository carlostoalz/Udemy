import { 
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types/index';
import { IAction } from '../../interfaces/IAction';
import { IAlertaState } from '../../interfaces/IAlertaState';

const initialState: IAlertaState = {
    mensaje: '',
    mensaje_archivo: '',
    error: null,
    loading: false
}

const alertaReducer = (state: IAlertaState = initialState, action: IAction) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            };
        case OCULTAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: ''
            }
        default:
            return state;
    }
}

export default alertaReducer;