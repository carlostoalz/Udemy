import { 
    AGREGAR_PRODUCTO, 
    AGREGAR_PRODUCTO_EXITO, 
    AGREGAR_PRODUCTO_ERROR, 
    COMENZAR_DESCARGA_PRODUCTOS, 
    DESCARGA_PRODUCTOS_EXITO, 
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR
} from "../types";
import { IProductoState } from '../interfaces/IProductoState';
import { IAction } from '../interfaces/IAction';

// Cada reducer tiene su propio state

const initialState: IProductoState = {
    productos: [],
    error: null,
    loading: false,
    productoEliminar: null
};

export default (state: IProductoState = initialState, action: IAction) => {
    
    switch (action.type) {    
        case AGREGAR_PRODUCTO:
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: action.payload
            };
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload ]
            }
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            };
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoEliminar: action.payload
            };
        case PRODUCTO_ELIMINAR_EXITO:
            return {
                ...state,
                productos: state.productos.filter( producto => producto.id !== state.productoEliminar ),
                productoEliminar: null
            };
        default:
            return state;
    }

};