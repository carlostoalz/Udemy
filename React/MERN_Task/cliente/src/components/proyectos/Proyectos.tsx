import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import Tareas from '../tareas/Tareas';
import AuthContext from '../../context/autenticacion/authContext';
import { IAuthContext } from '../../interfaces/IAuthContext';

const Proyectos = () => {

    // Extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext as IAuthContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="contenedor-app">
            <Sidebar />
            
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <Tareas />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Proyectos;