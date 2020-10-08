import React, { createContext, useEffect, useState } from 'react';
import { getDrink } from '../services/apiCall';

// Crear el context 
export const ModalContext = createContext<any>(null);

const ModalProvider = (props:any) => {

    // State del provider
    const [ idReceta, guardarIdReceta ] = useState<any>(null);
    const [ receta, guardarReceta ] = useState<any>({});

    // Una vez que tenemos una receta, llamar la api
    useEffect(() => {
        const obtenerBebida = async () => {
            if(!idReceta) return;
            guardarReceta(await getDrink(idReceta));
        }
        obtenerBebida();
    }, [idReceta]);

    return (
        <ModalContext.Provider
            value={{
                receta,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );

};

export default ModalProvider;

