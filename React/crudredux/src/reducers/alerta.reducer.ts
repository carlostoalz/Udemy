import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";
import { IAction } from '../interfaces/IAction';
import { IAlertaState } from "../interfaces/IAlertaState";

// Cada reducer tiene su state
const initialState: IAlertaState = {
    alerta: null
};

export default (state: IAlertaState = initialState, action: IAction) => {
    switch (action.type) {   
        case MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            };
        case OCULTAR_ALERTA:
            return {
                ...state,
                alerta: null
            };
        default:
            return state;
    }
};