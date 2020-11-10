import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types';
import { IAction } from '../interfaces/IAction';
import { IAlerta } from '../interfaces/IAlerta';
import { Dispatch } from 'react';

// Mostrar Alerta
export const mostrarAlertaAction = (alerta: IAlerta) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(crearAlerta(alerta));
    };
};

const crearAlerta = (alerta: IAlerta) => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
} as IAction);

// Ocultar Alerta
export const ocultarAlertaAction = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(ocultarAlerta())
    };
};

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
} as IAction);