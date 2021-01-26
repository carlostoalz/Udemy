import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { subirArchivoAction } from '../store/actions/archivo.action';
import { mostrarAlerta, ocultarAlerta } from '../store/actions/alerta.action';
import { IReducers } from '../interfaces/IReducers';
import { IEnlace } from '../interfaces/IEnlace';
import { crearEnlaceAction } from '../store/actions/enlace.action';
import Formulario from './Formulario';

const Dropzone: FC = () => {

    const dispatch = useDispatch();
    const { loading, archivo } = useSelector( (state: IReducers) => state.archivoState );
    const { password, descargas: decargas } = useSelector( (state: IReducers) => state.enlaceState );
    const { autenticado, usuario } = useSelector( (state: IReducers) => state.usuarioState );
    
    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
        dispatch( subirArchivoAction( acceptedFiles[0] ) );
    }, []);

    const onDropRejected = () => {
        dispatch( mostrarAlerta('No se puede subir, el limite del archivo es 1 MB, obten una cuenta para subir archivos mas grandes') );

        setTimeout(() => {
            dispatch( ocultarAlerta() );
        }, 5000);
    }

    // Extraer contenido de dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: Math.pow(1024,2) * 10 });

    const archivos = () => acceptedFiles.map( archivo => (
        <li 
            key={archivo.lastModified}
            className="bg-withe flex-1 p-3 mb-4 shadow-lg rounded"
        >
            <p className="font-bold text-xl">{ archivo.name }</p>
            <p className="text-sm text-gray-500">{ Number((archivo.size / Math.pow(1024,2)).toFixed(2)) } MB</p>
        </li>
    ));

    const crearEnlace = () => {
        const data = {
            ...archivo,
            descargas: decargas,
            password: password,
            autor: usuario?.id
        } as IEnlace;

        dispatch( crearEnlaceAction(data) );
    };

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        { archivos() }
                    </ul>

                    {
                        autenticado ? <Formulario /> : null
                    }

                    { loading ? 
                        <p className="my-10 text-center text-gray-600">Subiendo Archivo...</p> 
                        : 
                        <button
                            type="button"
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            onClick={ () => crearEnlace() }
                        >
                            Crear enlace
                        </button>
                    }
                    
                </div>
            )
            :
            (
                <div {...getRootProps({
                    className: 'dropzone w-full py-32'
                })}>
                    <input className="h-100" { ...getInputProps() }/>
                    {
                        isDragActive ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> :
                        <div className="text-center">
                            <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aquí</p>
                            <button type="button" className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800">Selecciona archivo para subir</button>
                        </div>
                    }
                </div>        
            )
            }
        </div>
    );
};

export default Dropzone;