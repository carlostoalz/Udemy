import { AxiosResponse } from "axios";
import clienteAxios from "../config/axios";
import tokenAuth from '../config/tokenAuth';
import { IUsuario } from '../interfaces/IUsuario';
import { IRSV } from '../interfaces/IRSV';

export const CrearUsuario = async (usuario: IUsuario) => {
    
    const respuesta: AxiosResponse<IRSV<null>> = await clienteAxios.post('/api/usuarios', usuario);
    return respuesta.data;
};

export const AutenticarUsuario = async (usuaario: IUsuario) => {
    const respuesta: AxiosResponse<IRSV<null>> = await clienteAxios.post('/api/auth', usuaario);
    return respuesta.data;
}

export const UsuarioAutenticado = async () => {
    tokenAuth();
    const respuesta: AxiosResponse<IRSV<IUsuario>> = await clienteAxios.get('/api/auth');
    return respuesta.data;
}