import React from 'react';
import PropTypes from 'prop-types'

type ErrorProps = {
    mensaje: string
}

const Error = ({ mensaje }: ErrorProps) => {
    return (
        <p className="red darken-4 error">{mensaje}</p>
    );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default Error;