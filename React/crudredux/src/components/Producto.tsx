import React from 'react';
import { useHistory } from 'react-router-dom';
import { IProducto } from '../interfaces/IProducto';
import { SwalUtil } from '../utils/swal.util';
import { SweetAlertResult } from 'sweetalert2';
// Redux
import { useDispatch } from 'react-redux';
import { eliminarProductoAction, obtenerProductioEditarAction } from '../actions/producto.actions';

type ProductoProps = {
    producto: IProducto
};

const Producto = ({ producto }: ProductoProps) => {

    const swal: SwalUtil = new SwalUtil();

    const dispatch = useDispatch();
    const history = useHistory(); // Habilitar history para redirección

    // Confirmar si desea eliminarlo
    const confirmarEliminarProducto = async (id: number) => {

        // Preguntar al usuario 
        const result: SweetAlertResult = await swal.Pregunta('¿Estas Seguro?', 'Un producto que se elimina no se puede recuperar');

        if (result.isConfirmed) {
            // Pasarlo al action
            dispatch( eliminarProductoAction(id) );
            swal.Exitoso('Eliminado', 'El producto se eliminó correctamente.')
        }

    };

    // Función que redirige de forma programada
    const redireccionarEdición = (producto: IProducto) => {
        dispatch( obtenerProductioEditarAction(producto) );
        history.push(`/productos/editar/${producto.id}`);
    };

    return (
        <tr>
            <td>{ producto.nombre }</td>
            <td><span className="font-weight-bold"> $ {producto.precio}</span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => redireccionarEdición(producto) }
                    className="btn btn-primary mr-2"
                >Editar</button>
                <button 
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(producto.id as number)}
                >Eliminar</button>
            </td>
        </tr>
    );

};

export default Producto;