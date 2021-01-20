import { 
    OBTENER_IMAGEN_HOTEL, 
    OBTENER_IMAGEN_HOTEL_EXITO, 
    OBTENER_IMAGEN_HOTEL_ERROR,
} from '../types/index';
import { Dispatch } from 'redux';
import { ObtenerImagenHotel } from '../../services/imagen.service';
import { IAction } from '../../interfaces/IAction';

export const obtenerImagenHotelAction = () => {
    return (dispatch: Dispatch) => {
        dispatch( obtenerImagenHotel() );

        try {
            const src: string = ObtenerImagenHotel();
            dispatch( obtenerImagenHotelExito(src) );
        } catch (error) {
            dispatch( obtenerImagenHotelError( true ) );
            console.error(error);
        }
    };
};

const obtenerImagenHotel = () => ({
    type: OBTENER_IMAGEN_HOTEL,
    payload: true
} as IAction);

const obtenerImagenHotelExito = (src: string) => ({
    type: OBTENER_IMAGEN_HOTEL_EXITO,
    payload: src
} as IAction);

const obtenerImagenHotelError = (estado: boolean) => ({
    type: OBTENER_IMAGEN_HOTEL_ERROR,
    payload: estado
} as IAction);