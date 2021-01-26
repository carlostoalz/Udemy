import React, { FC } from 'react';
import { css } from '@emotion/react'
import Navegacion from './navegacion';
import { EnlaceHome } from '../styled/index';

const Header: FC = () => {
    return (
        <header css={css`
            background-color: rgba(44, 62, 80);
            padding: 1rem;
        `}>
            <div css={css`
                max-width: 1200px;
                margin: 0 auto;

                @media (min-width: 768px) {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            `}>
                <EnlaceHome
                    to="/"
                >
                    <h1>Hotel Gatsby</h1>
                </EnlaceHome>

                <Navegacion />
            </div>
        </header>
    );
};

export default Header;