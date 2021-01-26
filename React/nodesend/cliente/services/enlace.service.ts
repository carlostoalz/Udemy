import { IEnlace } from '../interfaces/IEnlace';
import tokenAuth from '../config/tokenAuth';
import { AxiosResponse } from 'axios';
import { IRSV } from '../interfaces/IRSV';
import clienteAxios from '../config/axios';
import { IPasswordResponse } from '../interfaces/IPasswordResponse';

export const CrearEnlace = async (archivo: IEnlace) => {
    tokenAuth();
    const respuesta: AxiosResponse<IRSV<string>> = await clienteAxios.post('/api/enlaces', archivo);
    return respuesta.data;
};

export const ObtenerEnlace = async (url: string) => {
    const respuesta: AxiosResponse<IRSV<string | IPasswordResponse>> = await clienteAxios.get(`/api/enlaces/${ url }`);
    return respuesta.data
};

export const ObtenerEnlaces = async () => {
    const respuesta: AxiosResponse<IRSV<IEnlace[]>> = await clienteAxios.get(`/api/enlaces`);
    return respuesta.data
};

export const VerificarPassword = async (url: string, password: string) => {
    const respuesta: AxiosResponse<IRSV<IPasswordResponse>> = await clienteAxios.post(`/api/enlaces/${ url }`, { password });
    return respuesta.data;
}