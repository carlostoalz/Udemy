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
                mensaje: null
            };
        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload
            };
        case LOGIN_ERROR: 
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                mensaje: action.payload.msg
            };
        default:
            return state;
    }

};