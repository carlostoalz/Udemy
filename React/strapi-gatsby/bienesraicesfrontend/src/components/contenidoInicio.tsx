import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { obtenerPaginaInicioAction } from '../store/actions/pagina.action';
import { ImagenBackground, Imagenbg, Titulo } from '../styles/index';
import Encuentra from './encuentra';
import Propiedades from './propiedades';
import { IPagina } from '../interfaces/IPagina';
import { IPaginaState } from '../interfaces/IPaginaState';

const ContenidoInicio: FC = () => {

    const dispatch = useDispatch();
    const cargarPagina = () => dispatch( obtenerPaginaInicioAction() );
    cargarPagina();

    const pagina: IPagina = useSelector((state: any) => (state.paginas as IPaginaState).pagina as IPagina);
    const { nombre, contenido, imagen } = pagina;

    return (
        <>
            <ImagenBackground
                tag="section"
                fluid={ imagen.sharp.fluid }
                fadeIn="soft"
            >
                <Imagenbg>
                    <Titulo>Venta de casa y apartamentos exclusivos</Titulo>
                </Imagenbg>
            </ImagenBackground>
            <main>
                <div
                    css={css`
                        max-width: 800px;
                        margin: 0 auto;
                    `}
                >
                    <h1>{ nombre }</h1>
                    <p
                        css={css`
                            text-align: center;
                        `}
                    >{ contenido }</p>
                </div>
            </main>
            <Encuentra />
            <Propiedades />
        </>
    );
};

export default ContenidoInicio;