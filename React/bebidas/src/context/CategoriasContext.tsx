import React, { createContext, useState, useEffect } from 'react';
import { getCategories } from '../services/apiCall';

// Crear context
export const CategoriasContext = createContext<any>(null);

// Provider es donde se encuentran lñas funciones y state
const CategoriasProvider = (props:any) => {
    
    // Crear state del Context
    const [categorias, guardarCategorias] = useState<any[]>([]);

    // Ejecutar el llamado a la api
    useEffect(() => {
        
        const obtenerCategorias = async () => {
            guardarCategorias(await getCategories());
        };
        obtenerCategorias();

    }, []);

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );

};

export default CategoriasProvider;