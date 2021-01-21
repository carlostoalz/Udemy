import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerBannerAction } from '../store/actions/imagen.action';
import { ImagenBackgroundBanner, Imagenbg, TituloBanner } from '../styles/index';
import { IBanner } from '../interfaces/IBanner';
import { IImagenState } from '../interfaces/IImagenState';

const Encuentra: FC = () => {

    const dispatch = useDispatch();
    const cargarBanner = () => dispatch( obtenerBannerAction() );
    cargarBanner();

    const banner: IBanner = useSelector( (state: any) => (state.imagenes as IImagenState).banner as IBanner );

    return (
        <ImagenBackgroundBanner
            tag="seccion"
            fluid={banner.sharp.fluid}
            faseIn="soft"
        >
            <Imagenbg>
                <TituloBanner>encuentra la casa de tus sueños</TituloBanner>
                <p>15 Años de experiencia</p>
            </Imagenbg>
        </ImagenBackgroundBanner>
    );
};

export default Encuentra;