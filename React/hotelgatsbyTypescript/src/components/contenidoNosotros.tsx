import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IPagina } from '../interfaces/IPagina';
import { IPaginaState } from '../interfaces/IPaginaState';
import { obtenerPaginaAction } from '../store/actions/pagina.action';
import Image from 'gatsby-image';
import { css } from '@emotion/react'
import { Contenido } from '../styled/index';

const ContenidoNosotros: FC = () => {

    const dispatch = useDispatch();
    const cargarInicio = () => dispatch( obtenerPaginaAction('nosotros') );
    cargarInicio();

    const pagina: IPagina = useSelector( ( state: any ) => ( state.paginas as IPaginaState ).pagina as IPagina );

    return (
        <>
            <h2
                css={css`
                    margin-top: 4rem;
                    text-align: center;
                    font-size: 4rem;
                `}
            >{pagina.titulo}</h2>
            <Contenido>
                <p>{pagina.contenido}</p>
                <Image fluid={pagina.imagen.fluid}/>
            </Contenido>
        </>
    );
};

export default ContenidoNosotros;