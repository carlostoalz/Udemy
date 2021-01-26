import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IReducers } from '../interfaces/IReducers';

const Alerta: FC = () => {

    const { mensaje, error } = useSelector((state: IReducers) => state.usuarioState);
    const enlaceState = useSelector((state: IReducers) => state.enlaceState);
    const { mensaje_archivo } = useSelector((state: IReducers) => state.alertaState);

    return (
        <>
            { mensaje && (
                <div className="bg-green-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
                    { mensaje }
                </div>
            ) }

            { error && (
                <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
                    { error.mensaje }
                </div>
            )}

            { mensaje_archivo && (
                <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
                    { mensaje_archivo }
                </div>
            )}

            { enlaceState.error && (
                <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
                    { enlaceState.error.mensaje }
                </div>
            )}
        </>
    );
};

export default Alerta;