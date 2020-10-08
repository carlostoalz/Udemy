import React from 'react';
import { IResultado } from '../interfaces/IResultado';
import PropTypes from 'prop-types';

type ClimaProps = {
    resultado: IResultado
}

const Clima = ({resultado}:ClimaProps) => {

    const { name, main } = resultado;

    if(!name) return null;

    // Grados Kelvin
    const kelvin = 273.15;

    return (
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es:</h2>
                <p className="temperatura">
                    {(main.temp - kelvin).toFixed(2)} <span>&#x2103;</span>
                </p>
                <p>Temperatura Maxima:
                    {(main.temp_max - kelvin).toFixed(2)} <span>&#x2103;</span>
                </p>
                <p>Temperatura Minima:
                    {(main.temp_min - kelvin).toFixed(2)} <span>&#x2103;</span>
                </p>
            </div>
        </div>
    );
};

Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Clima;