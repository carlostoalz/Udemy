import React, { FC } from 'react';
import { Link } from 'gatsby';
import { Nav, NavLink } from '../styles';

const Navegacion: FC = () => {
    return (
        <Nav>
            <NavLink 
                to={"/"}
                activeClassName="pagina-actual"
            >Inicio</NavLink>
            <NavLink 
                to={"/nosotros"}
                activeClassName="pagina-actual"
            >Nosotros</NavLink>
            <NavLink 
                to={"/propiedades"}
                activeClassName="pagina-actual"
            >Propiedades</NavLink>
        </Nav>
    );
};

export default Navegacion;