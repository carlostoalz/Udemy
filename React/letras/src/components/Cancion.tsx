import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

type CancionProps = {
    letra: string
}

const Cancion = ({letra}:CancionProps) => {

    if (letra.trim().length === 0) return null;

    return (
        <Fragment>
            <h2>Letra de canción</h2>
            <p className="letra">{letra}</p>
        </Fragment>
    );
}

Cancion.propTypes = {
    letra: PropTypes.string.isRequired
};

export default Cancion;