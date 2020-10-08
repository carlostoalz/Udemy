import React from 'react';
import PropTypes from 'prop-types';

type ImagenProps =  {
    imagen: any
}

const Imagen = ({imagen}:ImagenProps) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
                <img src={imagen.previewURL} alt={imagen.tags} className="card-img-top"/>
                <div className="card-body">
                    <p className="card-text">{imagen.likes} Me gusta</p>
                    <p className="card-text">{imagen.views} Vistas</p>
                </div>
                <div className="card-footer">
                    <a 
                        href={imagen.largeImageURL} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-block"
                    >Ver Imágen</a>
                </div>
            </div>
        </div>
    );
};

Imagen.propTypes = {
    imagen: PropTypes.object.isRequired
}

export default Imagen