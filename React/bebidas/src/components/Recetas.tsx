import React, { useContext } from 'react';
import { RecetasContext } from '../context/RecetasContext';
import Receta from './Receta';

const Recetas = () => {

    // Extraer las recetas
    const { recetas } = useContext(RecetasContext);

    return (
        <div className="row mt-5">
            { 
                (recetas as any[]).map( receta => (
                    <Receta 
                        key={receta.idDrink}
                        receta={receta}
                    />
                ))
            }
        </div>
    );
}

export default Recetas;