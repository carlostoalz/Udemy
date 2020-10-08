import React from 'react';
import PropTypes from 'prop-types'

type NoticiaProps = {
    noticia: any
}

const Noticia = ({noticia}:NoticiaProps) => {

    const imagen = (noticia.urlToImage) ? 
        <div className="card-image">
            <img src={noticia.urlToImage} alt={noticia.title}/>
            <span className="card-title">{noticia.source.name}</span>
        </div>
     : null;

    return ( 
        <div className="col s12 m6 l4">
            <div className="card">
                {imagen}
                <div className="card-content">
                    <h3>{noticia.title}</h3>
                    <p>{noticia.description}</p>
                </div>
                <div className="card-action">
                    <a 
                        href={noticia.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="waves-effect waves-light btn"
                    >Ver noticia completa</a>
                </div>
            </div>
        </div>
    );
}

Noticia.propTypes = {
    noticia: PropTypes.object.isRequired
};

export default Noticia;