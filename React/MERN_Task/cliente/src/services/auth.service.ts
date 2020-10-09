import clienteAxios from '../common/axios';
import { tokenAuth } from '../common/tokenAuth';
import { IUsuario } from '../interfaces/IUsuario';
import { ILogin } from '../interfaces/ILogin';

export const crearUsuario = async (datos: IUsuario) => {
    const respuesta = await clienteAxios.post('/api/usuarios', datos);
    return respuesta.data;
};

export const obtenerUsuario = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        // función para enviar el token por headers
        tokenAuth(token);  
    }

    const respuesta = await clienteAxios.get('/api/auth');
    return respuesta.data;
};

export const loginUsuario = async (datos: ILogin) => {

    const respuesta = await clienteAxios.post('/api/auth', datos);

    return respuesta.data;

};