import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import { IAuthContext } from '../../interfaces/IAuthContext';

const Barra = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesión } = authContext as IAuthContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return (
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{ usuario.nombre }</span></p>  : null }
            <nav className="nav-principal">
            <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesión() }
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
};

export default Barra;