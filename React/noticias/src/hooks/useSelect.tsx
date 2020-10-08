import React, { useState } from 'react';
import { Categorias } from '../common/Categorias';

const useSelect = (stateInicial: string) => {

    // State del custom hook 
    const [state, setState] = useState(stateInicial);

    const SelectNoticias = () => (
        <select 
            className="browser-default"
            value={state}
            onChange={e => setState(e.target.value)}
        >
            <option value="">-- Seleccione --</option>
            {Categorias.map( opcion => <option key={opcion.value} value={opcion.value}>{opcion.label}</option>)}
        </select>
    );


    return [state, SelectNoticias];

}

export default useSelect