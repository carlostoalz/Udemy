import React, { createContext, useState, useEffect } from 'react';
import { IBusqueda } from '../interfaces/IBusqueda';
import { getRecipes } from '../services/apiCall';

export const RecetasContext = createContext<any>(null);

const RecetasProvider = (props: any) => {

    const [recetas, guardarReceta] = useState<any[]>([]);
    const [busqueda, buscarReceta] = useState<IBusqueda>({
        nombre: '',
        categoria: ''
    });
    const [consultar,guardarConsultar] = useState(false);

    useEffect(() => {
        const obtenerRecetas = async () => {
            guardarReceta(await getRecipes(busqueda));
        };
        if (consultar) {
            obtenerRecetas();
        }
    }, [busqueda, consultar]);

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarReceta, 
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );

}

export default RecetasProvider;