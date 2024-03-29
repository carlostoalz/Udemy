import React, { Fragment, useEffect } from 'react';
import { obtenerProductosAction } from '../actions/producto.actions';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { IProductoState } from '../interfaces/IProductoState';
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        // Consultar la API
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        cargarProductos();
        // eslint-disable-next-line
    }, []);

    // obtener el state
    const productos = useSelector( (state: any) => (state.productos as IProductoState).productos );
    const error = useSelector( (state: any) => (state.productos as IProductoState).error );
    const cargando = useSelector( (state: any) => (state.productos as IProductoState).loading );    

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null }
            { cargando ? <p className="text-center mt-4">Cargando....</p> : null }
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { productos.length === 0 ? <p>No hay produtos</p> : (
                        productos.map( producto => (
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    ) }
                </tbody>
            </table>
        </Fragment>
    )
};

export default Productos