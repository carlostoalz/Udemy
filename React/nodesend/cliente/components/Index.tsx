import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { usuarioAutenticadoAction } from '../store/actions/usuario.action';
import Dropzone from './Dropzone';
import { IReducers } from '../interfaces/IReducers';
import Alerta from './Alerta';

const Index: FC = () => {

    const dispatch = useDispatch();
    const { mensaje_archivo } = useSelector( (state: IReducers) => state.alertaState );
    const { enlace } = useSelector((state: IReducers) => state.enlaceState);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) dispatch( usuarioAutenticadoAction() );
    }, []);

    return (
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            {
                enlace ?
                (
                    <>
                        <p className="text-center text-2xl mt-10">
                            <span className="font-bold text-red-700 text-3xl uppercase">Tu url es:</span> { `${ process.env.frontendURL }/enlaces/${ enlace.url }` }
                        </p>
                        <button 
                            type="button"
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                            onClick={() => navigator.clipboard.writeText(`${ process.env.frontendURL }/enlaces/${ enlace.url }`)}
                        >Copiar Enlace</button>
                    </>
                )
                :
                (
                    <>
                        { mensaje_archivo && <Alerta /> }
                        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
                            <Dropzone />                
                            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Compartir archivos de forma sencilla y privada</h2>
                                <p className="text-lg leading-loose">
                                    <span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado despúes de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en linea para siempre
                                </p>
                                <Link href="/crearcuenta">
                                    <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</a>
                                </Link>
                            </div>
                        </div>
                    </>
                    
                )
            }
        </div>
    );
};

export default Index;