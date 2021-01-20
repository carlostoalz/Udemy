import { 
    OBTENER_PAGINA,
    OBTENER_PAGINA_EXITO,
    OBTENER_PAGINA_ERROR,
} from '../types/index';
import { Dispatch } from 'redux';
import { IAction } from '../../interfaces/IAction';
import { IPagina } from '../../interfaces/IPagina';
import { ObtenerPagina } from '../../services/pagina.service';

export const obtenerPaginaAction = (slug: string) => {
    return (dispatch: Dispatch) => {
        dispatch( obtenerPagina() );

        try {
            const pagina: IPagina = ObtenerPagina(slug);
            dispatch( obtenerPaginaExito(pagina) );
        } catch (error) {
            dispatch( obtenerPaginaError(true) );
            console.error(error);            
        }
    };
};

const obtenerPagina = () => ({
    type: OBTENER_PAGINA,
    payload: true
} as IAction);

const obtenerPaginaExito = (pagina: IPagina) => ({
    type: OBTENER_PAGINA_EXITO,
    payload: pagina
} as IAction);

const obtenerPaginaError = (estado: boolean) => ({
    type: OBTENER_PAGINA_ERROR,
    payload: estado
} as IAction);