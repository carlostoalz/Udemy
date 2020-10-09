import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';
import { IAuthContext } from '../../interfaces/IAuthContext';

const RutaPrivada = ({ component: Component, ...props }: any) => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando ,usuarioAutenticado } = authContext as IAuthContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);
    
    return (
        <Route { ...props } render = { props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )}/>
    );

}

export default RutaPrivada;