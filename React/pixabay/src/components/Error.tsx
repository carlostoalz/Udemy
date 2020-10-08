import React from 'react';
import PropTypes from 'prop-types';

type ErrorProps = {
    mensaje: string
};

const Error = ({mensaje}:ErrorProps) => {
    return (
        <p className="my-3 p-4 text-center alert alert-primary">{mensaje}</p>
    );
};

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default Error;