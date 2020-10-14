import { IProducto } from './IProducto';

export interface IProductoState {
    productos: IProducto[];
    error: boolean | null;
    loading: boolean;
    productoEliminar: number | null;
}