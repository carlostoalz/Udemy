import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProducto } from '../interfaces/IProducto';
import { IProductoState } from '../interfaces/IProductoState';
// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';

const NuevoProducto = ({ history }: any) => {

    // State del componente
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState(0);

    // Utilizar useDispatch y te crea una función 
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector( (state: any) => (state.productos as IProductoState).loading );
    const error = useSelector( (state: any) => (state.productos as IProductoState).error );

    // Mandar a llamar el actión de productoAction
    const agregarProducto = (producto: IProducto) => dispatch( crearNuevoProductoAction(producto) );

    // Cuando el usuario haga submit
    const submitNuevoProducto = (e: SyntheticEvent) => {
        e.preventDefault();

        // Validar formulario
        if (nombre.trim() === '' || precio <= 0) {
            return;
        }

        // Si no hay errores

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        // Redireccionar
        history.push('/');
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={ e => guardarNombre(e.target.value) }
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Precio Producto</label>
                                <input 
                                    type="number" 
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={ e => guardarPrecio(Number(e.target.value)) }
                                />
                            </div>
                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        { cargando ? <p>Cargando</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NuevoProducto