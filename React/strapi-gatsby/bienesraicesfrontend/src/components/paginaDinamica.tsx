import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import store from '../store';
import { ContenidoPagina } from '../styles/index';
import Layout from './layout';
import { IPagina } from '../interfaces/IPagina';
import Propiedades from './propiedades';

export const query = graphql`
    query($id: String!) {
        paginas: allStrapiPaginas(filter: { id: { eq: $id } }) {
            nodes {
                id
                nombre
                contenido
                imagen {
                    sharp: childImageSharp {
                        fluid( maxWidth: 1200 ) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`;

type PaginaDinamicaProps = {
    data: {
        paginas: {
            nodes: IPagina[]
        }
    }
}

const PaginaDinamica: FC<PaginaDinamicaProps> = ({ data: { paginas: { nodes } } }) => {

    const { nombre, contenido, imagen } = nodes[0];

    return (
        <Provider store={store}>
            <Layout>
                <main className="contenedor">
                    <h1>{nombre}</h1>
                    <ContenidoPagina>
                        <Image 
                            fluid={imagen.sharp.fluid}
                        />
                        <p>{ contenido }</p>
                    </ContenidoPagina>
                </main>
                { nombre === 'Propiedades' ? (<Propiedades />) : null }
            </Layout>
        </Provider>
    );
};

export default PaginaDinamica;