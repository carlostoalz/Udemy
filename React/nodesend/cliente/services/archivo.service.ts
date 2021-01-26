import { AxiosResponse } from "axios";
import clienteAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth';
import { IRSV } from '../interfaces/IRSV';

export const SubirArchivo = async (acceptedFile: File) => {
    tokenAuth();
    const formData = new FormData();
    formData.append('archivo', acceptedFile);
    const respuesta: AxiosResponse<IRSV<string>> = await clienteAxios.post('/api/archivos', formData);
    return respuesta.data;
}