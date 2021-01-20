import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerPaginaAction } from '../store/actions/pagina.action';
import { IPagina } from '../interfaces/IPagina';
import { IPaginaState } from '../interfaces/IPaginaState';
import Image from 'gatsby-image';
import { css } from '@emotion/react';
import { TextoInicio } from '../styled/index';

const ContenidoInicio: FC = () => {

    const dispatch = useDispatch();
    const cargarInicio = () => dispatch( obtenerPaginaAction('inicio') );
    cargarInicio();

    const pagina: IPagina = useSelector( ( state: any ) => ( state.paginas as IPaginaState ).pagina as IPagina );
    

    return (
        <>
            <h2
                css={css`
                    text-align: center;
                    font-size: 4rem;
                    margin-top: 4rem;                    
                `}
            >{pagina.titulo}</h2>
            <TextoInicio>
                <p>{pagina.contenido}</p>
                <Image fluid={pagina.imagen.fluid}/>
            </TextoInicio>
        </>
    );
};

export default ContenidoInicio;