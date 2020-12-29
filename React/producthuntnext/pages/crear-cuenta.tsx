import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit, TituloCrearCuenta, CampoError } from '../style/Styled';
import useValidation from '../hooks/useValidation';
import { IValidatorCrearCuenta } from '../interfaces/validations';
import { validateCrearCuenta } from '../validation/validateCrearCuenta'
import firebase from '../firebase';

const STATE_INICIAL: IValidatorCrearCuenta = {
    nombre: '',
    email: '',
    password: ''
};

const CrearCuenta = () => {
    
    const [ error, setError ] = useState(false);

    
    const crearCuenta = async () => {
        try {
            await firebase.registrar(nombre, email, password);
        } catch (error) {
            console.error('Hubo un error al crear el usuario', error.message);
            setError(error.message);
        }
    };

    const { valores ,errores, handleSubmit, handleChange, handleBlur } = useValidation<IValidatorCrearCuenta>(STATE_INICIAL, validateCrearCuenta, crearCuenta);

    const { nombre, email, password } = valores;

    return (
        <div>
            <Layout>
                <>
                    <TituloCrearCuenta>Crear cuenta</TituloCrearCuenta>
                    <Formulario
                        onSubmit={handleSubmit}
                    >
                        <Campo>
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                placeholder="Tu nombre" 
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        { errores.nombre && <CampoError>{ errores.nombre }</CampoError> }

                        <Campo>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Tu email" 
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        { errores.email && <CampoError>{ errores.email }</CampoError> }
                        { error && <CampoError>{error}</CampoError> }
                        <Campo>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Tu password" 
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        { errores.password && <CampoError>{ errores.password }</CampoError> }

                        <InputSubmit type="submit" value="Crear cuenta"/>
                    </Formulario>
                </>
            </Layout>
        </div>
    );
};

export default CrearCuenta;