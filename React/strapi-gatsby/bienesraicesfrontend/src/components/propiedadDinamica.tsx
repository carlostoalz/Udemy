import React, { FC } from 'react';
import { Provider } from 'react-redux';
import Image from 'gatsby-image';
import { graphql } from 'gatsby';
import store from '../store';
import Iconos from './iconos';
import Layout from './layout';
import { IPropiedad } from '../interfaces/IPropiedad';
import { ContenidoDinamico, Sidebar } from '../styles/index';

export const query = graphql`
    query($id: String!) {
        propiedades: allStrapiPropiedades(filter: { id: { eq: $id } }) {
            nodes {
                id
                nombre
                descripcion
                wc
                estacionamiento
                habitaciones
                precio
                agentes {
                    nombre
                    telefono
                    email
                }
                imagen {
                    sharp: childImageSharp {
                        fluid( maxWidth:1200 ) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`;

type PropiedadDinamicaProps = {
    data: {
        propiedades: {
            nodes: IPropiedad[]
        }
    }
}

const PropiedadDinamica: FC<PropiedadDinamicaProps> = ({data: { propiedades: { nodes } }}) => {

    const { nombre, descripcion, wc, estacionamiento, habitaciones, agentes, imagen, precio } = nodes[0];

    return (
        <Provider store={store}>
            <Layout>
                <h1>{ nombre }</h1>
                <ContenidoDinamico>
                    <main>
                        <Image 
                            fluid={imagen.sharp.fluid}
                        />
                        <p>{ descripcion }</p>
                    </main>
                    <Sidebar>
                        <p className="precio">$ { precio }</p>
                        <Iconos 
                            wc={wc}
                            estacionamiento={estacionamiento}
                            habitaciones={habitaciones}
                        />
                        <div className="agente">
                            <h2>Vendedor: </h2>
                            <p>{agentes.nombre}</p>
                            <p>Tel: {agentes.telefono}</p>
                            <p>Email: {agentes.email}</p>
                        </div>
                    </Sidebar>
                </ContenidoDinamico>
            </Layout>
        </Provider>
    );
};

export default PropiedadDinamica;