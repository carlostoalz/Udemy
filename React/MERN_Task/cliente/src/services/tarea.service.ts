import clienteAxios from '../common/axios';
import { ITarea } from '../interfaces/ITarea';

export const AgregarTarea = async (tarea: ITarea) => {
    delete (tarea as any)._id;
    const resultado = await clienteAxios.post('/api/tareas', tarea);
    return resultado.data;
};

export const ObtenerTareas = async (proyecto: string) => {
    const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto } });
    return resultado.data;
};

export const EliminarTarea = async (tarea: string, proyecto: string) => {
    const resultado = await clienteAxios.delete(`/api/tareas/${tarea}`, { params: { proyecto } });
    return resultado.data;
};

export const ActualizarTarea = async (tarea: ITarea) => {
    const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
    return resultado.data;
}