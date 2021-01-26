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
import { IUsuarioState } from '../../interfaces/IUsuarioState';

const initialState: IUsuarioState = {
    token: (typeof window !== "undefined" ? localStorage.getItem('token') : '') as string,
    autenticado: false,
    usuario: null,
    mensaje: '',
    loading: false,
    error: null
}

const usuarioReducer = (state: IUsuarioState = initialState, action: IAction) => {
    switch (action.type) {
        case CREAR_CUENTA:
        case AUTENTICAR_USUARIO:
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                loading: action.payload
            };
        case CREAR_CUENTA_EXITO:
            return {
                ...state,
                mensaje: action.payload,
                loading: false,
                error: null
            };
        case AUTENTICAR_USUARIO_EXITO:
            return {
                ...state,
                token: action.payload,
                autenticado: true,
                loading: false,
                error: null
            };
        case USUARIO_AUTENTICADO_EXITO: 
            return {
                ...state,
                usuario: action.payload,
                autenticado: true,
                loading: false,
                error: null
            };
        case CREAR_CUENTA_ERROR:
        case AUTENTICAR_USUARIO_ERROR:
        case USUARIO_AUTENTICADO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                token: '',
                autenticado: false
            };
        case CERRAR_SESION:
            return {
                token: '',
                autenticado: false,
                usuario: null,
                mensaje: '',
                loading: false,
                error: null
            };
        case LIMPIAR_ALERTA:
            return {
                ...state,
                error: null,
                mensaje: ''                
            };
        default:
            return state;
    }
};

export default usuarioReducer;