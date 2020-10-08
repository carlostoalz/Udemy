import React from 'react';
import './css/carrito.css';
import Producto from './Producto';

const Carrito = ({carrito,agregarProducto}: any) => (

    <div className="carrito">
        <h2>Tu Carrito de compras</h2>
        {carrito.lenght === 0 
        ? <p>No hay elementos en el carrito</p>
        : carrito.map((producto:any) => (
            <Producto 
                key={producto.id}
                producto={producto}
                carrito={carrito}
                agregarProducto={agregarProducto}
            />
        ))}
    </div>

);

export default Carrito;