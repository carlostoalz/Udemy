import React from 'react';
import Link from "next/link";
import { Nav } from '../../style/Styled';

const Navegacion = () => {
    return (
        <Nav>
            <Link href="/">Inicio</Link>
            <Link href="/populares">Populares</Link>
            <Link href="/nuevo-producto">Nuevo Producto</Link>
        </Nav>
    );
};

export default Navegacion;