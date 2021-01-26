import { Dispatch } from 'redux';
import { 
    CREAR_ENLACE,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    OBTENER_ENLACE,
    OBTENER_ENLACE_EXITO,
    OBTENER_ENLACE_ERROR,
    OBTENER_ENLACES,
    OBTENER_ENLACES_EXITO,
    OBTENER_ENLACES_ERROR,
    LIMPIAR_ENLACE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS,
    VERIFICAR_PASSWORD,
    VERIFICAR_PASSWORD_EXITO,
    VERIFICAR_PASSWORD_ERROR
} from '../types/index';
import { IAction } from '../../interfaces/IAction';
import { IEnlace } from '../../interfaces/IEnlace';
import { IError } from '../../interfaces/IError';
import { handleError } from '../../common/handleError';
import { CrearEnlace, ObtenerEnlace, ObtenerEnlaces, VerificarPassword } from '../../services/enlace.service';
import { IPasswordResponse } from '../../interfaces/IPasswordResponse';

export const crearEnlaceAction = (enlace: IEnlace) => {
    return async (dispatch:Dispatch) => {
        dispatch( crearEnlace() );

        try {
            const resultado = await CrearEnlace(enlace);
            enlace.url = resultado.datos;
            dispatch( crearEnlaceExito( enlace ) );
        } catch (error) {
            error = handleError(error);
            dispatch( crearEnlaceError(error) );
        }
    }
};

const crearEnlace = () => ({
    type: CREAR_ENLACE,
    payload: true
} as IAction);

const crearEnlaceExito = (enlace: IEnlace) => ({
    type: CREAR_ENLACE_EXITO,
    payload: enlace
} as IAction);

const crearEnlaceError = (error: IError) => ({
    type: CREAR_ENLACE_ERROR,
    payload: error
} as IAction);

export const obtenerEnlaceAction = (url: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(obtenerEnlace());

        try {
             await ObtenerEnlace(url);
             dispatch(obtenerEnlaceExito());
        } catch (error) {
            error = handleError(error);
            dispatch( obtenerEnlaceError(error) );
        }
    }
};

const obtenerEnlace = () => ({
    type: OBTENER_ENLACE,
    payload: true
} as IAction);

const obtenerEnlaceExito = () => ({
    type: OBTENER_ENLACE_EXITO
} as IAction);

const obtenerEnlaceError = (error: IError) => ({
    type: OBTENER_ENLACE_ERROR,
    payload: error
} as IAction);

export const obtenerEnlacesAction = () => {
    return async (dispatch: Dispatch) => {
        dispatch(obtenerEnlaces());

        try {
            const resultado = await ObtenerEnlaces();
            dispatch( obtenerEnlacesExito(resultado.datos) );
        } catch (error) {
            error = handleError(error);
            dispatch( obtenerEnlacesError(error) );
        }
    }
};

const obtenerEnlaces = () => ({
    type: OBTENER_ENLACES,
    payload: true
} as IAction);

const obtenerEnlacesExito = (enlaces: IEnlace[]) => ({
    type: OBTENER_ENLACES_EXITO,
    payload: enlaces
} as IAction);

const obtenerEnlacesError = (error: IError) => ({
    type: OBTENER_ENLACES_ERROR,
    payload: error
} as IAction);

export const limpiarEnlaceAction = () => ({
    type: LIMPIAR_ENLACE
} as IAction);

export const agregarPasswordAction = (password: string) => ({
    type: AGREGAR_PASSWORD,
    payload : password
} as IAction);

export const agregarDescargasAction = (descargas: number) => ({
    type: AGREGAR_DESCARGAS,
    payload: descargas
} as IAction);

export const verificarPasswordAction = (url:string, password: string) => {
    return async ( dispatch: Dispatch ) => {
         dispatch( verificarPassword() );
         
         try {
             const resultado = await VerificarPassword(url, password);
             dispatch( verificarPasswordExito(resultado.datos) );
         } catch (error) {
            error = handleError(error);
            dispatch( verificarPasswordError(error) );
         }
    }
};

const verificarPassword = () => ({
    type: VERIFICAR_PASSWORD,
    payload: true
} as IAction);

const verificarPasswordExito = (passwordResponse: IPasswordResponse) => ({
    type: VERIFICAR_PASSWORD_EXITO,
    payload: passwordResponse
} as IAction);

const verificarPasswordError = (error: IError) => ({
    type: VERIFICAR_PASSWORD_ERROR,
    payload: error
} as IAction);