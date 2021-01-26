import React, { FC, useState, useEffect, FormEvent } from 'react';
import { IPasswordResponse } from '../interfaces/IPasswordResponse';
import { useDispatch, useSelector } from 'react-redux';
import { verificarPasswordAction } from '../store/actions/enlace.action';
import { IReducers } from '../interfaces/IReducers';
import Alerta from './Alerta';

type EnlaceProps = {
    enlace: string | IPasswordResponse;
}

const Enlace: FC<EnlaceProps> = ({ enlace }) => {

    const dispatch = useDispatch();

    const { passwordResponse, error } = useSelector( (state: IReducers) => state.enlaceState );

    const [ tienePassword, setTienePassword ] = useState<boolean | undefined>( (enlace as IPasswordResponse).password );
    const [ password, setPassword ] = useState<string>( '' );

    const verificarPassword = ( form: FormEvent<HTMLFormElement>  ) => {
        form.preventDefault();
        
        if ((enlace as IPasswordResponse).url) {
            dispatch( verificarPasswordAction( (enlace as IPasswordResponse).url, password ) );
        } else {
            dispatch( verificarPasswordAction( (enlace as string), password ) );
        }
    }

    useEffect(() => {
        if (passwordResponse) {
            setTienePassword(passwordResponse.password);
        }
    }, [passwordResponse]);

    return (
        <>
            {
                tienePassword ? (
                    <>
                        <p className="text-center">Este enlace esta protegido por un password, colocalo a continuación</p>
                        { error && <Alerta /> }
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form 
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ e => verificarPassword(e) }
                                >
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >Password</label>
                                    <input 
                                        type="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        placeholder="Password del enlace"
                                        value={ password }
                                        onChange={ e => setPassword(e.target.value) }
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 w-full px-10 py-3 mt-3 rounded text-white uppercase font-bold cursor-pointer"
                                    >Validar passwod...</button>
                                </form>
                            </div>
                        </div>
                    </>                    
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo: </h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                                href={`${ process.env.backendURL }/api/archivos/${ passwordResponse ? passwordResponse.nombre ? passwordResponse.nombre : (enlace as IPasswordResponse).nombre ? (enlace as IPasswordResponse).nombre : enlace: enlace }`} 
                                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                                download
                            >Aquí</a>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Enlace;