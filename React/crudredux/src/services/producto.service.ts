import clienteAxios from '../config/axios';
import { IProducto } from '../interfaces/IProducto';

// Insertar en la API
export const AgregarProducto = async (prodcuto: IProducto) => {
    
    await clienteAxios.post('/productos', prodcuto);
    
};

export const ObtenerProductos = async () => {
    const resultado = await clienteAxios.get('/productos');
    return resultado.data;
};

export const EliminarProducto = async (id: number) => {
    await clienteAxios.delete(`/productos/${id}`);
}