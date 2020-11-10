import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { editarProductoAction } from '../actions/producto.actions';
import { IProductoState } from '../interfaces/IProductoState';
import { IProducto } from '../interfaces/IProducto';

const EditarProducto = () => {

    const history = useHistory()
    const dispatch = useDispatch();

    // Nuevo state de producto
    const [ producto, guardarProducto ] = useState<IProducto>({
        nombre: '',
        precio: 0
    });

    // Producto a editar
    const productoEditar = useSelector( (state: any) => (state.productos as IProductoState).productoEditar ) as IProducto;

    useEffect( () => {
        guardarProducto(productoEditar);
    }, [productoEditar]);

    // leer los datos del formulario
    const onChangeFormulario = (e: SyntheticEvent) => {
        guardarProducto({
            ...producto,
            [(e.target as HTMLInputElement).name] : (e.target as HTMLInputElement).value
        });
    };

    const { nombre, precio } = productoEditar;

    const submitEditarProducto = (e:SyntheticEvent) => {
        e.preventDefault();
        dispatch(editarProductoAction(producto));
        history.push('/');
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="">Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeFormulario}
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
                                    onChange={onChangeFormulario}
                                />
                            </div>
                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EditarProducto