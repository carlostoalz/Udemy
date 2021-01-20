import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Global, css } from "@emotion/react";
import { useSelector, useDispatch } from 'react-redux';
import Header from './header';
import Footer from './footer';
import { obtenerSEOAction } from '../store/actions/seo.action';
import { ISEO } from '../interfaces/ISEO';
import { ISEOState } from '../interfaces/ISEOState';

const Layout: FC = (props) => {

    const dispatch = useDispatch();
    const cargarSEO = () => dispatch( obtenerSEOAction() );
    cargarSEO();

    const SEO: ISEO = useSelector( (state: any) => (state.SEO as ISEOState).SEO as ISEO );

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
                        font-size: 18px;
                        font-size: 1.8rem;
                        line-height: 1.5;
                        font-family: 'PT Sans', sans-serif;
                    }
                    h1, h2, h3 {
                        margin: 0;
                        line-height: 1.5;
                    }
                    h1, h2 {
                        font-family: 'Roboto', serif;
                    }
                    h3 {
                        font-family: 'PT Sans', sans-serif;
                    }
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                `}
            />
            <Helmet>
                <title>{SEO.siteName}</title>
                <meta name="description" content={SEO.fallbackSeo.description} />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto:ital,wght@0,700;1,400&display=swap" rel="stylesheet"/>
            </Helmet>
            <Header/>
            {props.children}
            <Footer 
                title={SEO.siteName}
            />
        </>
    );

};

export default Layout;