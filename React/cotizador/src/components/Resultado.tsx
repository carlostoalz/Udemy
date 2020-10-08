import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type ResultadoProps = {
    cotizacion: number
}

const Mensaje = styled.p`
    background-color: rgb(127, 224, 237);
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
`;

const ResultadoCotizacion = styled.div`
    text-align: center;
    padding: .5rem;
    border: 1px solid #26c6da;
    background-color: rgb(127, 224, 237);
    margin-top: 1rem;
    position: relative;
`;

const TextoCotización = styled.p`
    color: #00838F;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    margin: 0;
`;

const Resultado = ({cotizacion} : ResultadoProps) => {

    return (
        (cotizacion === 0)
            ? <Mensaje>Elige marca, año y tipo de seguro</Mensaje> 
            : (
                <ResultadoCotizacion>
                    <TransitionGroup
                        component="span"
                        className="resultado"
                    >
                        <CSSTransition
                            classNames="resultado"
                            key={cotizacion}
                            timeout={{enter: 500, exit: 500}}
                        >
                            <TextoCotización>El total es: $ <span>{cotizacion}</span></TextoCotización>
                        </CSSTransition>
                    </TransitionGroup>
                </ResultadoCotizacion>
              )
    );
};

Resultado.propTypes = {
    cotizacion: PropTypes.number.isRequired
}

export default Resultado;