import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerImagenHotelAction } from '../store/actions/imagen.action';
import { ImageBackground, TextoImagen } from '../styled/index';
import { IImagenState } from '../interfaces/IImagenState';

const ImagenHotel: FC = () => {

    const dispatch = useDispatch();
    const cargarImagen = () => dispatch( obtenerImagenHotelAction() );
    cargarImagen();

    const srcSetWebp: any = useSelector( ( state: any ) => (state.imagenes as IImagenState).src );

    return (
        <ImageBackground tag="section" fluid={srcSetWebp} fadeIn="soft">
            <TextoImagen>
                <h1>Bienvenido a hotel gastby</h1>
                <p>El mejor hotel para tus vacaciones</p>
            </TextoImagen>
        </ImageBackground>
    );
};

export default ImagenHotel;