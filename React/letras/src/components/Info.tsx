import React from 'react';
import PropTypes from 'prop-types';

type InfoProps = {
    info: any
}

const Info = ({info}:InfoProps) => {

    if (Object.keys(info).length === 0) return null;

    return (
        <div className="card borde-light">
            <div className="card-header bg-primary text-light fonst-weight-bold">
                Información Artista
            </div>
            <div className="card-body">
                <img src={info.strArtistThumb} alt="Logo Artista"/>
                <p className="card-text">Género: {info.strGenre}</p>
                <h2 className="card-text">Biografia: </h2>
                <p className="card-text">Biografia: {info.strBiographyES === null ? info.strBiographyEN : info.strBiographyES}</p>
                <p className="card-text">
                    {info.strFacebook !== null && info.strFacebook !== '' ? (
                        <a href={`https://${info.strFacebook}`} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>    
                    ) : null}
                    {info.strTwitter !== null && info.strTwitter !== '' ? (
                        <a href={`https://${info.strTwitter}`} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>   
                    ) : null}
                    {info.strLastFMChart !== null && info.strLastFMChart !== '' ? (
                        <a href={`${info.strLastFMChart}`} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-lastfm"></i>
                        </a>   
                    ) : null}
                </p>
            </div>
        </div>
    );
}; 

Info.propTypes = {
    info: PropTypes.object.isRequired
}

export default Info;