import React from 'react';
import { ResultadoDiv, Precio, Info } from '../common/Styled';
import PropTypes from 'prop-types';

type CotizacionProps = {
    resultado: any
}

const Cotizacion = ({resultado}:CotizacionProps) => {

    if (Object.keys(resultado).length === 0) return null;

    return (
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio mas alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio mas bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
    );

};

Cotizacion.propTypes = {
    resultado: PropTypes.object.isRequired
};

export default Cotizacion;