import { 
    AGREGAR_PRODUCTO, 
    AGREGAR_PRODUCTO_EXITO, 
    AGREGAR_PRODUCTO_ERROR, 
    COMENZAR_DESCARGA_PRODUCTOS, 
    DESCARGA_PRODUCTOS_EXITO, 
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR
} from "../types";
import { IProducto } from '../interfaces/IProducto';
import { AgregarProducto, ObtenerProductos, EliminarProducto, EditarProductio as EditarProducto } from '../services/producto.service';
import { SwalUtil } from '../utils/swal.util';
import { IAction } from '../interfaces/IAction';
import { Dispatch } from 'redux';

const swal: SwalUtil = new SwalUtil();

// Crear nuevos productos
export const crearNuevoProductoAction = (producto: IProducto) => {
    
    return async (dispatch: any) => {

        // Insertar en la api
        await AgregarProducto(producto);
        // Si todo sale bien
        dispatch( agregarProducto() );
        swal.Exitoso( 'Correcto', 'El producto se agrego correctamente' );
        
        try {
            dispatch( agregarProductoExito(producto) );
        } catch (error) {
            dispatch( agregarProductoError(true) );
            swal.Errors( error );
        }
    };
};

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// Si el producto se guarda en la base de datos
const agregarProductoExito = (producto: IProducto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

// Si hubo un error
const agregarProductoError = (estado: boolean) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// Función que descarga los productos de la base de datos
export const obtenerProductosAction = () => {
    
    return async (dispatch: Dispatch) => {
        dispatch( descargarProductos() );

        try {
            const productos: IProducto[] = await ObtenerProductos();
            dispatch( descargarProductosExitosa(productos) );
        } catch (error) {
            dispatch( descargarProductosError( true ) );
            swal.Errors( error );
        }
    }

};

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
} as IAction);

const descargarProductosExitosa = (productos: IProducto[]) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
} as IAction);

const descargarProductosError = (estado: boolean) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: estado
} as IAction);

// Selecciona y elimina el producto
export const eliminarProductoAction = (id: number) => {

    return async (dispatch: Dispatch) => {
        
        dispatch( obtenerProductoEliminar(id) );

        try {
            await EliminarProducto(id);
            dispatch( eliminarProductoExito() );
        } catch (error) {
            dispatch( eliminarProductoError(true) );
            swal.Errors(error);
        }

    };

};

const obtenerProductoEliminar = (id: number) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
} as IAction);

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
} as IAction);

const eliminarProductoError = (estado: boolean) => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: estado
} as IAction);

// Colocar el producto en edición
export const obtenerProductioEditarAction = (producto: IProducto) => {    
    return (dispatch:any)  => {        
        dispatch( obtenerProductoEditar(producto) );
    };
};

const obtenerProductoEditar = (producto: IProducto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
} as IAction);

// Edita un registro en la API y state
export const editarProductoAction = (producto: IProducto) => {
    return async (dispatch: Dispatch) => {
        dispatch(editarProoducto());
        try {
            await EditarProducto(producto);
            dispatch( editarProoductoExito(producto) );
        } catch (error) {
            dispatch( editarProoductoError(true) );
            swal.Errors(error);
        }
    };
};

const editarProoducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
} as IAction);

const editarProoductoExito = (prodcto: IProducto) => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: prodcto
} as IAction);

const editarProoductoError = (estado: boolean) => ({
    type: PRODUCTO_EDITAR_ERROR,
    payload: estado
} as IAction);