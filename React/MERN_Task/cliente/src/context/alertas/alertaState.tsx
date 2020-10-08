import React, { useReducer } from "react";
import AlertaReducer from './alertaReducer';
import AlertaContext from './alertasContext';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types/index';
import { IAlertaAction } from '../../interfaces/IAlertaAction';

const AlertaState = (props: any)  => {

    const initialState: any = {
        alerta: null
    };

    const [ state, dispatch ] = useReducer<(state: any, action: IAlertaAction) => any>( AlertaReducer, initialState );

    // Funciones
    const mostrarAlerta = (msg: string, categoria: string) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg, categoria
            }
        });

        // Despues de 5 segundos limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            });
        }, 5000);
    };

    return (
        <AlertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    );

};

export default AlertaState;