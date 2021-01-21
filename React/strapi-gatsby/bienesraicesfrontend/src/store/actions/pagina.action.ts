import {
    OBTENER_PAGINA_INICIO,
    OBTENER_PAGINA_INICIO_EXITO,
    OBTENER_PAGINA_INICIO_ERROR
} from '../types';
import { Dispatch } from 'redux';
import usePaginaInicio from '../../hooks/use-pagina-inicio';
import { IAction } from '../../interfaces/IAction';
import { IPagina } from '../../interfaces/IPagina';

export const obtenerPaginaInicioAction = () => {
    return (dispatch: Dispatch) => {
        dispatch( obtenerPaginaInicio() );

        try {
            const pagina: IPagina = usePaginaInicio();
            dispatch( obtenerPaginaInicioExito(pagina) );
        } catch (error) {
            dispatch( obtenerPaginaInicioError( true ) );
            console.error(error);
        }
    }
};

const obtenerPaginaInicio = () => ({
    type: OBTENER_PAGINA_INICIO,
    payload: true
} as IAction);

const obtenerPaginaInicioExito = (pagina: IPagina) => ({
    type: OBTENER_PAGINA_INICIO_EXITO,
    payload: pagina
} as IAction);

const obtenerPaginaInicioError = (estado: boolean) => ({
    type: OBTENER_PAGINA_INICIO_ERROR,
    payload: estado
} as IAction);
