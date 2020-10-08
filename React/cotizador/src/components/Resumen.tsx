import React from 'react';
import PropTypes from 'prop-types';
import { IDato } from '../interfaces/IDato';
import styled from '@emotion/styled';
import { primerMayuscula } from '../helper';

type ResumenProps = {
    datos: IDato
}

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFF;
    margin-top: 1rem;
`;

const Resumen = ({datos}:ResumenProps) => {

    const { marca, year, plan } = datos;

    if (marca === '' || year === '' || plan === '') return null;

    return (
        <ContenedorResumen>
            <h2>Resumen de cotización</h2>
            <ul>
                <li>Marca: { primerMayuscula(marca) } </li>
                <li>Plan: { primerMayuscula(plan) } </li>
                <li>Año del Auto: {year} </li>
            </ul>
        </ContenedorResumen>
    );

};

Resumen.propTypes = {
    datos: PropTypes.object.isRequired
}

export default Resumen;