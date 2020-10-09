import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import { REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from '../../types';
import { IAuthAction } from '../../interfaces/IAuthAction';
import { IAuthState } from '../../interfaces/IAuthState';
import { INuevaCuenta } from '../../interfaces/INuevaCuenta';
import { IResultado } from '../../interfaces/IResultado';
import { ILogin } from '../../interfaces/ILogin';
import { crearUsuario, obtenerUsuario, loginUsuario } from '../../services/auth.service';
import { handleError } from '../../common/handleError';

const AuthState = (props:any) => {

    const initialState: IAuthState = {
        token: localStorage.getItem('token'),
        autenticado: false,
        usuario: null,
        mensaje: null,
        cargando: true
    };

    const [ state, dispatch ] = useReducer<(state: IAuthState, action: IAuthAction) => any>(AuthReducer, initialState);

    // Las funciones
    const registrarUsuario = async (datos: INuevaCuenta) => {

        try {
            const respuesta: IResultado<null> =  await crearUsuario({
                email: datos.email,
                nombre: datos.nombre,
                password: datos.password
            });
    
            if (respuesta.exitoso) {
                dispatch({
                    type: REGISTRO_EXITOSO,
                    payload: respuesta.token
                });
    
                // Obtener el usuario
                await usuarioAutenticado();
            }
        } catch (error) {
            handleError(error, dispatch, REGISTRO_ERROR);
        }
        

    };

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {

        try {                
            const respuesta: IResultado<any> =  await obtenerUsuario();

            if (respuesta.exitoso) {
                dispatch({
                    type: OBTENER_USUARIO,
                    payload: respuesta.datos
                });
            }

        } catch (error) {
            handleError(error, dispatch, LOGIN_ERROR);
        }
        
    };

    // Cuando el usuario inica sesión
    const iniciarSesion = async (datos: ILogin) => {
        
        try {
            
            const respuesta: IResultado<null> = await loginUsuario(datos);

            if(respuesta.exitoso)
            {
                dispatch({
                    type: LOGIN_EXITOSO,
                    payload: respuesta.token
                });

                // Obtener el usuario
                await usuarioAutenticado();
            }
        } catch (error) {
            handleError(error, dispatch, LOGIN_ERROR);
        }

    };

    // Cierra la sesión del usuario
    const cerrarSesión = () => {
        dispatch({
            type: CERRAR_SESION
        });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesión
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

};

export default AuthState;