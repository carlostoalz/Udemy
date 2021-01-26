import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import { IUsuario } from '../interfaces/IUsuario';
import { IReducers } from '../interfaces/IReducers';
import { autenticarUsuarioAction } from '../store/actions/usuario.action';
import Alerta from './Alerta';

const Login: FC = () => {

    const dispatch = useDispatch();
    const { mensaje, error, autenticado } = useSelector((state: IReducers) => state.usuarioState);

    const router = useRouter();

    useEffect(() => {
        if (autenticado) {
            router.push('/');
        }
    },[autenticado]);

    // Formulario y validación con formik y yup
    const formik = useFormik<IUsuario>({
        initialValues: {
            id: '',
            nombre: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
            password: Yup.string().required('El password no puede ir vacio')
        }),
        onSubmit: ( usuario ) => {
            dispatch( autenticarUsuarioAction( usuario ) );
        }
    });

    return (
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Iniciar Sesión</h2>
            { mensaje || error && <Alerta /> }
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label 
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="email"
                            >Email</label>
                            <input 
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                placeholder="Email del Usuario"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            { formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.email }</p>
                                </div>
                            ) : null }
                        </div>
                        <div className="mb-4">
                            <label 
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="password"
                            >Password</label>
                            <input 
                                type="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                placeholder="Password del Usuario"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{ formik.errors.password }</p>
                                </div>
                            ) : null }
                        </div>
                        <button 
                            type="submit"
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                        >Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;