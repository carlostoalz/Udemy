import { IAuthAction } from "../../interfaces/IAuthAction";
import { REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from '../../types';
import { IAuthState } from '../../interfaces/IAuthState';

export default (state:IAuthState, action: IAuthAction) => {

    switch (action.type) {

        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            };
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            };
        case CERRAR_SESION:
        case LOGIN_ERROR: 
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: false,
                mensaje: action.payload ? action.payload.msg : null,
                cargando: false
            };
        default:
            return state;
    }

};