import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Imagen from './Imagen';

type ImagenesProps = {
    imagenes: any[]
}

const Imagenes = ({imagenes}:ImagenesProps) => {
    return (
        <div className="col-12 p-5 row">
            {imagenes.map((imagen:any) => (
                <Imagen 
                    key={imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
    );
}

Imagenes.propTypes = {
    imagenes: PropTypes.array.isRequired
}

export default Imagenes;