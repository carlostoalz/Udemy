import React from 'react';
import Noticia from './Noticia';
import PropTypes from 'prop-types'

type NoticiasProps = {
    noticias: any[]
}

const Noticias = ({ noticias }:NoticiasProps) => {
    return (
        <div className="row">
            { noticias.map( (value: any, index: number) => (
                <Noticia 
                    key={index}
                    noticia={value}
                />
            ))}
        </div>
    );
};

Noticias.propTypes = {
    noticias: PropTypes.object.isRequired
};

export default Noticias;