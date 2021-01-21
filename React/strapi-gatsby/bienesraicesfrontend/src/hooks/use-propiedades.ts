import { useStaticQuery, graphql } from "gatsby";
import { IPropiedad } from '../interfaces/IPropiedad';

const usePropiedades = () => {
    
    const resultado = useStaticQuery(graphql`
        query {
            propiedades: allStrapiPropiedades {
                nodes {
                    id
                    nombre
                    precio
                    descripcion
                    estacionamiento
                    habitaciones
                    wc
                    categorias {
                        nombre
                    }
                    agentes {
                        nombre
                        telefono
                        email
                    }
                    imagen {
                        sharp: childImageSharp {
                            fluid( maxWidth: 600, maxHeight: 400 ) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                }
            }
        }
    `);

    return resultado.propiedades.nodes as IPropiedad[];
};

export default usePropiedades;