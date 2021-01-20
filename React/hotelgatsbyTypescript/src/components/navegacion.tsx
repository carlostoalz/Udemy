import React, { FC } from 'react';
import { Link } from 'gatsby';
import { Nav, NavLink } from '../styled'

const Navegacion: FC = () => {
    return (
        <Nav>
            <NavLink 
                to={'/'}
                activeClassName="pagina-actual"
            >Inicio
            </NavLink>
            <NavLink 
                to={'/nosotros'}
                activeClassName="pagina-actual"
            >Nosotros</NavLink>
        </Nav>
    );
};

export default Navegacion;