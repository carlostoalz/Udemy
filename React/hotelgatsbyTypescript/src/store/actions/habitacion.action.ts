import { 
    OBTENER_HABITACIONES,
    OBTENER_HABITACIONES_EXITO,
    OBTENER_HABITACIONES_ERROR,
} from '../types/index';
import { Dispatch } from 'redux';
import useHabitaciones from '../../hooks/use-habitaciones';
import { IAction } from '../../interfaces/IAction';
import { IHabitacion } from '../../interfaces/IHabitacion';


export const obtenerHabitacionesAction = () => {
    return (dispatch: Dispatch) => {
        dispatch( obtenerHabitaciones() );

        try {
            const habitaciones: IHabitacion[] = useHabitaciones();
            dispatch( obtenerHabitacionesExito(habitaciones) );
        } catch (error) {
            dispatch( obtenerHabitacionesError(true) );
            console.error(error);    
        }
    }
};

const obtenerHabitaciones = () => ({
    type: OBTENER_HABITACIONES,
    payload: true
} as IAction);

const obtenerHabitacionesExito = (habitaciones: IHabitacion[]) => ({
    type: OBTENER_HABITACIONES_EXITO,
    payload: habitaciones
} as IAction);

const obtenerHabitacionesError = (estado: boolean) => ({
    type: OBTENER_HABITACIONES_ERROR,
    payload: estado
} as IAction);