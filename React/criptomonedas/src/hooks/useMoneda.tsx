import React, { Fragment, useState, useEffect } from 'react';
import { IMoneda } from '../interfaces/IMoneda';
import { getCurrency } from '../services/currency';
import { Label, Select } from '../common/Styled';

const useMoneda = (label: string, stateInicial: string) => {

    // State de nuestro custom hook
    const [opciones, setOpciones] = useState<IMoneda[]>([]);
    const [state, actualizarState] = useState(stateInicial);

    useEffect(() => {
        const consultarAPIMoneda = async () => {
            setOpciones(await getCurrency());
        };
        consultarAPIMoneda();
    }, [setOpciones]);

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y función que modifica el state
    return [state, Seleccionar, actualizarState];
};

export default useMoneda;