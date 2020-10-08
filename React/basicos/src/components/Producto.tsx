import React from 'react';
import Carrito from './Carrito';

const Producto = ({producto, productos, carrito, agregarProducto}:any) => {

    const { nombre, precio, id } = producto;

    //Agregar producto al carrito
    const seleccionarProducto = (id: Number) => {
        const producto = (productos as any[]).filter((producto:any) => producto.id === id)[0];
        agregarProducto([
            ...carrito,
            producto
        ]);
    };

    //Eliminar un producto del carrito
    const eliminarProducto = (id: number) => {
        const productos = (carrito as any[]).filter((producto:any) => producto.id !== id);
        
        //Colocar los productos en el state
        agregarProducto(productos);
    };

    return (
        <div>   
            <h2>{nombre}</h2>
            <p>${precio}</p>
            
            {productos
            ?
                (
                    <button 
                        type='button'
                        onClick={() => seleccionarProducto(producto.id)}>
                            Comprar
                    </button>
                )
            :
                (
                    <button 
                        type='button'
                        onClick={() => eliminarProducto(id)}>
                            Eliminar
                    </button>
                )
            }
        </div>
    );
};

export default Producto;