import { 
    OBTENER_SEO,
    OBTENER_SEO_EXITO,
    OBTENER_SEO_ERROR
} from '../types/index';
import { Dispatch } from 'redux';
import useSeo from '../../hooks/use-seo';
import { IAction } from '../../interfaces/IAction';
import { ISEO } from '../../interfaces/ISEO';

export const obtenerSEOAction = () => {
    
    return (dispatch: Dispatch) => {
        dispatch( obtenerSEO() );

        try {
            const seo: ISEO = useSeo();
            dispatch( obtenerSEOExito(seo) ); 
        } catch (error) {
            dispatch( obtenerSEOError(true) );
            console.error(error);    
        }
    };

};

const obtenerSEO = () => ({
    type: OBTENER_SEO,
    payload: true
} as IAction);

const obtenerSEOExito = (seo: ISEO) => ({
    type: OBTENER_SEO_EXITO,
    payload: seo
} as IAction);

const obtenerSEOError = (estado: boolean) => ({
    type: OBTENER_SEO_ERROR,
    payload: estado
});