import React from 'react';
import { MensajeError } from '../common/Styled';
import PropTypes from 'prop-types';

type ErrorProps = {
    mensaje: string
}

const Error = ({mensaje}:ErrorProps) => <MensajeError>{mensaje}</MensajeError>;

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
};

export default Error;