import React, { Fragment, useState, useEffect } from 'react';
import { Label, Select } from '../common/Styled';
import { getCriptomonedas } from '../services/criptomonedas';

const useCriptoMoneda = (label: string, stateInicial: string) => {

    const [state, actualizarState] = useState(stateInicial);
    const [listaCripto, guardarCripotomonedas] = useState<any[]>([]);

    useEffect(() => {
        const consultarAPI = async () => {
            guardarCripotomonedas(await getCriptomonedas());
        };
        consultarAPI();
    }, [guardarCripotomonedas]);
    
    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-- Seleccione --</option>
                {listaCripto.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y función que modifica el state
    return [state, Seleccionar, actualizarState];
};

export default useCriptoMoneda;