import React, { FC } from 'react';
import Helmet from 'react-helmet';
import { Global, css } from '@emotion/react';
import Header from './header';

const Layout: FC = ({ children }) => {
    return (
        <>
            <Global 
                styles={css`
                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after {
                        box-sizing: inherit;
                    }
                    body {
                        font-size: 1.6rem;
                        line-height: 2;
                        font-family: 'Lato', sans-serif;
                    }
                    h1, h2, h3 {
                        margin: 0;
                        line-height: 1.5;
                    }
                    h1, h2 {
                        text-align: center;
                        font-family: 'Lato', sans-serif;
                        font-weight: 300;
                    }
                    h3 {
                        font-family: 'Roboto', sans-serif;
                    }
                    ul {
                        list-style: none;
                        margin: 0%;
                        padding: 0;
                    }
                    .contenedor {
                        max-width: 120rem;
                        margin: 0 auto;
                        width: 95%;
                    }
                    img {
                        max-width: 100%;
                    }
                `}
            />
            <Helmet>
                <title>Bienes Raices Gatsby</title>
                <meta name="description" content="Sitio web de bienes raices en Gatsby"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=PT+Serif:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
            </Helmet>
            <Header />
            { children }
        </>
    );
};

export default Layout;