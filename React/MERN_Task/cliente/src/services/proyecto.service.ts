import clienteAxios from '../common/axios';
import { IProyecto } from '../interfaces/IProyecto';


export const InsertarProyecto = async (datos: IProyecto) => {
    delete (datos as any)._id;
    const resultado = await clienteAxios.post('/api/proyectos', datos);
    return resultado.data;
};

export const ObtenerProyectos = async () => {
    const resultado = await clienteAxios.get('/api/proyectos');
    return resultado.data;
};

export const EliminarProyecto = async ( id: string ) => {
    const resultado = await clienteAxios.delete(`/api/proyectos/${id}`);
    return resultado.data;
};