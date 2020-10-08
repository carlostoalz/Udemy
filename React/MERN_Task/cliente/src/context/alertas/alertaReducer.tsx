import { IAlertaAction } from '../../interfaces/IAlertaAction';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types/index';


export default (state: any, action: IAlertaAction) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload
            };
        case OCULTAR_ALERTA:
            return {
                alerta: null
            };    
        default:
            return state;
    }
};