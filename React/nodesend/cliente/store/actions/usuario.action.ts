import { Dispatch } from 'redux';
import { 
    CREAR_CUENTA,
    CREAR_CUENTA_EXITO,
    CREAR_CUENTA_ERROR,
    AUTENTICAR_USUARIO,
    AUTENTICAR_USUARIO_EXITO,
    AUTENTICAR_USUARIO_ERROR,
    USUARIO_AUTENTICADO,
    USUARIO_AUTENTICADO_EXITO,
    USUARIO_AUTENTICADO_ERROR,
    CERRAR_SESION,
    LIMPIAR_ALERTA
} from '../types/index';
import { IAction } from '../../interfaces/IAction';
import { IUsuario } from '../../interfaces/IUsuario';
import { IError } from '../../interfaces/IError';
import { CrearUsuario, AutenticarUsuario, UsuarioAutenticado } from '../../services/usuario.service';
import { handleError } from '../../common/handleError';

export const crearCuentaAction = (usuario: IUsuario) => {
    return async (dispatch: Dispatch) => {
        dispatch( crearCuenta() );

        try {
            const resultado = await CrearUsuario( usuario );
            dispatch( crearCuentaExito( resultado.mensajeUsuario ) );
        } catch (error) {
            error = handleError(error);
            dispatch( crearCuentaError(error) );
        }

        setTimeout(() => {
            dispatch( limpiarAlerta() );
        }, 3000);
    }
};

const crearCuenta = () => ({
    type: CREAR_CUENTA,
    payload: true
} as IAction);

const crearCuentaExito = (mensajeUsuario: string) => ({
    type: CREAR_CUENTA_EXITO,
    payload: mensajeUsuario
} as IAction);

const crearCuentaError = (error: IError) => ({
    type: CREAR_CUENTA_ERROR,
    payload: error
} as IAction);

export const autenticarUsuarioAction = (usuario: IUsuario) => {
    return async (dispatch: Dispatch) => {
        
        dispatch( autenticarUsuario() );

        try {
            const resultado = await AutenticarUsuario(usuario);
            localStorage.setItem('token', resultado.token);
            dispatch( autenticarUsuarioExito(resultado.token) );
        } catch (error) {
            error = handleError(error);
            dispatch( autenticarUsuarioError(error) );
        }

        setTimeout(() => {
            dispatch( limpiarAlerta() );
        }, 3000);
    }
};

const autenticarUsuario = () => ({
    type: AUTENTICAR_USUARIO,
    payload: true
} as IAction);

const autenticarUsuarioExito = (token: string) => ({
    type: AUTENTICAR_USUARIO_EXITO,
    payload: token
} as IAction);

const autenticarUsuarioError = (error: IError) => ({
    type: AUTENTICAR_USUARIO_ERROR,
    payload: error
} as IAction);

export const usuarioAutenticadoAction = () => {
    return async (dispatch: Dispatch) => {

        dispatch(usuarioAutenticado());
        
        try {
            const resultado = await UsuarioAutenticado();
            dispatch( usuarioAutenticadoExito( resultado.datos ) );
        } catch (error) {
            error = handleError(error);
            dispatch( usuarioAutenticadoError(error) );
        }

        setTimeout(() => {
            dispatch( limpiarAlerta() );
        }, 3000);
    }
};

const usuarioAutenticado = () => ({
    type: USUARIO_AUTENTICADO,
    payload: true
} as IAction);

const usuarioAutenticadoExito = (usuario: IUsuario) => ({
    type: USUARIO_AUTENTICADO_EXITO,
    payload: usuario
} as IAction);

const usuarioAutenticadoError = (error: IError) => ({
    type: USUARIO_AUTENTICADO_ERROR,
    payload: error
} as IAction);

export const cerrarSesionAction = () => {
    return (dispatch: Dispatch) => {
        localStorage.removeItem('token');
        dispatch( cerrarSesion() );
    }
};

const cerrarSesion = () => ({
    type: CERRAR_SESION
} as IAction);

const limpiarAlerta = () => ({
    type: LIMPIAR_ALERTA
} as IAction);