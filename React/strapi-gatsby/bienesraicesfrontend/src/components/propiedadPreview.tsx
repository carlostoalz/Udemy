import React, { FC } from 'react';
import Image from 'gatsby-image';
import urlSlug from "url-slug";
import { Card, Contenido, Boton } from '../styles';
import { IPropiedad } from '../interfaces/IPropiedad';
import Iconos from './iconos';

type PropiedadPreviewProps = {
    propiedad: IPropiedad
}

const PropiedadPreview: FC<PropiedadPreviewProps> = ({ propiedad }) => {
    return (
        <Card>
            <Image 
                fluid={propiedad.imagen.sharp.fluid}
            />
            <Contenido>
                <h3>{ propiedad.nombre }</h3>
                <p className="precio">$ {propiedad.precio}</p>
                <Iconos 
                    wc={propiedad.wc}
                    estacionamiento={propiedad.estacionamiento}
                    habitaciones={propiedad.habitaciones}
                />
                <Boton
                    to={ urlSlug(propiedad.nombre) }
                >
                    Visitar propiedad
                </Boton>
            </Contenido>
        </Card>
    );
};

export default PropiedadPreview;