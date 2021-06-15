import React, { FC } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import Navegacion from './navegacion';
import { obtenerLogoAction } from '../store/actions/imagen.action';
import { ILogo } from '../interfaces/ILogo';
import { IImagenState } from '../interfaces/IImagenState';

const Header: FC = () => {

    const dispatch = useDispatch();
    const cargarLogo = () => dispatch( obtenerLogoAction() );
    cargarLogo();

    const logo: ILogo = useSelector( (state:any) => (state.imagenes as IImagenState).logo as ILogo );

    return (
        <header
            css={css`
                background-color: #0d283b;
                padding: 1rem;
            `}
        >
            <div
                css={css`
                    max-width: 120rem;
                    margin: 0 auto;
                    text-align: left;

                    @media (min-width: 768px) {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                `}
            >
                <Link to="/">
                    <img src={ logo.publicURL }/>
                </Link>
                <Navegacion />
            </div>
        </header>
    );
};

export default Header;