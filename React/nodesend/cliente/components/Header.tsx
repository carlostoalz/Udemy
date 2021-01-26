import React, { FC } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { IReducers } from '../interfaces/IReducers';
import { cerrarSesionAction } from '../store/actions/usuario.action';
import { limpiarEnlaceAction } from '../store/actions/enlace.action';

const Header: FC = () => {

    const dispatch = useDispatch();
    const { usuario } = useSelector((state: IReducers) => state.usuarioState);

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <Link href="/">
                <img 
                    src="/logo.svg" 
                    className="w-64 mb-8 md:mb-0 cursor-pointer"
                    onClick={ () => dispatch( limpiarEnlaceAction() ) }
                />
            </Link>
            <div>
            { usuario ? (
                    <div className="flex items-center">
                        <p className="mr-2">Hola { usuario.nombre }</p>
                        <button 
                            type="button"
                            className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
                            onClick={ () => dispatch( cerrarSesionAction() ) }
                        >Cerrar Sesión</button>
                    </div>
                ) 
                :
                (
                    <>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                        </Link>
                        <Link href="/crearcuenta">
                            <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase">Crear Cuenta</a>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;