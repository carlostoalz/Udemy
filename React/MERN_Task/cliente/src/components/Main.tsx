import React from 'react';
import AppRoutes from './routes/App.Routes';
import ProyectoState from '../context/proyectos/ProyectoState';
import TareaState from '../context/tareas/tareaState';
import AlertaState from '../context/alertas/alertaState';
import AuthState from '../context/autenticacion/authState';
import { tokenAuth } from '../common/tokenAuth';

const token = localStorage.getItem('token');
if (token) {
    tokenAuth(token);
}

const Main = () => {

    return (
        <ProyectoState>
            <TareaState>
                <AlertaState>
                    <AuthState>
                        <AppRoutes />
                    </AuthState>
                </AlertaState>
            </TareaState>
        </ProyectoState>
    );
}

export default Main;