import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { agregarPasswordAction, agregarDescargasAction } from '../store/actions/enlace.action';

const Formulario: FC = () => {
    
    const dispatch = useDispatch();

    const [ tienePassword, setTienePassword ] = useState(false);

    return (
        <div className="w-full mt-20">
            <div>
                <label className="text-lg text-gray-800">Eliminar tras:</label>
                <select 
                    className="appereance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:ouline-none focus:border-gray-500"
                    onChange={ e => dispatch( agregarDescargasAction(parseInt(e.target.value)) ) }
                >
                    <option value="" selected disabled>-- Seleccione --</option>
                    <option value="1">1 descarga</option>
                    <option value="5">5 descargas</option>
                    <option value="10">10 descargas</option>
                    <option value="20">20 descargas</option>
                </select>
            </div>

            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Proteger con Contraseña</label>
                    <input type="checkbox" checked={tienePassword} onChange={ () => setTienePassword(!tienePassword) }/>
                </div>
                {
                    tienePassword ? (
                        <input 
                            type="password" 
                            className="appereance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:ouline-none focus:border-gray-500"
                            onChange={ e => dispatch( agregarPasswordAction(e.target.value) ) }
                        />
                    ) : null
                }
                
            </div>
        </div>
    );
};

export default Formulario;