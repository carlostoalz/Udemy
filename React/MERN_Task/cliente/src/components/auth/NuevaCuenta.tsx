import React, { useState, useContext, useEffect, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/autenticacion/authContext';
import { IAlertaContext } from '../../interfaces/IAlertaContext';
import { INuevaCuenta } from '../../interfaces/INuevaCuenta';
import { IAuthContext } from '../../interfaces/IAuthContext';

const NuevaCuenta = (props: any) => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext as IAlertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext as IAuthContext

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {

        if (autenticado) {
            props.history.push('/proyectos');
        }

        if(mensaje) {
            mostrarAlerta(mensaje,'alerta-error');
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);
    

    // State para iniciar sesión
    const [registro, guardarRegistro] = useState<INuevaCuenta>({
        nombre: '', 
        email: '', 
        password: '', 
        confirmar: ''
    });

    // extraer de usuario
    const { nombre, email, password, confirmar } = registro as INuevaCuenta;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        guardarRegistro({
            ...registro,
            [e.target.name] : e.target.value
        } as INuevaCuenta);
    };

    // Cuando el usuario quiere inciar sesión
    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if ( nombre.trim() === '' || 
             email.trim() === '' || 
             password.trim() === '' || 
             confirmar.trim() === '' ) {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // Password minimo de 6 caracteres
        if (password.length < 6) {
            mostrarAlerta('El password debe ser al menos de 6 caracteres.', 'alerta-error');
            return;
        }

        // Los password deben coincidir
        if (password !== confirmar) {
            mostrarAlerta('Los passwords no coinciden.', 'alerta-error');
            return;
        }

        // Pasarlo al actión
        await registrarUsuario({
            nombre,
            email,
            password,
            confirmar
        })
    };
    
    return (
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre"
                            placeholder="Tu Nombre"
                            value={registro?.nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email"
                            placeholder="Tu Email"
                            value={registro?.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            placeholder="Tu Password"
                            value={registro?.password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password" 
                            name="confirmar" 
                            id="confirmar"
                            placeholder="Repite tu Password"
                            value={registro?.confirmar}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            value="Registrarme" 
                            className="btn btn-primario btn-block"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a iniciar sesión
                </Link>
            </div>
        </div>
    );
};

export default NuevaCuenta;
