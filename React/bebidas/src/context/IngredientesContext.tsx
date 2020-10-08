import React, { useState, createContext, useEffect } from 'react';
import { getIngredients } from '../services/apiCall';

export const IngredientesContext = createContext<any>(null);

const IngredientesProvider = (props:any) => {

    const [ ingredientes, guardarIngredientes ] = useState<any[]>([]);

    useEffect(() => {

        const obtenerIngredientes = async () => {
            guardarIngredientes(await getIngredients());
        }
        obtenerIngredientes();

    }, []);

    return (
        <IngredientesContext.Provider
            value={{
                ingredientes
            }}
        >
            {props.children}
        </IngredientesContext.Provider>
    );

};

export default IngredientesProvider;