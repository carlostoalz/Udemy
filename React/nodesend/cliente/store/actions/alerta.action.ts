import { 
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types/index';
import { IAction } from '../../interfaces/IAction';

export const mostrarAlerta = (mensaje: string) => ({
    type: MOSTRAR_ALERTA,
    payload: mensaje
} as IAction);

export const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
} as IAction);