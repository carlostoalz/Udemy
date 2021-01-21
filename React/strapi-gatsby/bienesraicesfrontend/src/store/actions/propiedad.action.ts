import { 
    OBTENER_PROPIEDADES,
    OBTENER_PROPIEDADES_EXITO,
    OBTENER_PROPIEDADES_ERROR
} from '../types/index';
import { Dispatch } from 'redux';
import usePropiedades from '../../hooks/use-propiedades';
import { IAction } from '../../interfaces/IAction';
import { IPropiedad } from '../../interfaces/IPropiedad';

export const obtenerPropiedadesAction = () => {
    return (dispatch: Dispatch) => {
        dispatch( obtenerPropiedades() );

        try {
            const propiendades: IPropiedad[] = usePropiedades();
            dispatch( obtenerPropiedadesExito(propiendades) );
        } catch (error) {
            console.error(error);            
            dispatch( obtenerPropiedadesError(true) );
        }
    }
};

const obtenerPropiedades = () => ({
    type: OBTENER_PROPIEDADES,
    payload: true
} as IAction);

const obtenerPropiedadesExito = (propiedades: IPropiedad[]) => ({
    type: OBTENER_PROPIEDADES_EXITO,
    payload: propiedades
} as IAction);

const obtenerPropiedadesError = (estado: boolean) => ({
    type: OBTENER_PROPIEDADES_ERROR,
    payload: estado
} as IAction);