import { graphql, useStaticQuery } from 'gatsby';
import { IPagina } from '../interfaces/IPagina';


const usePaginaInicio = () => {

    const resultado = useStaticQuery(graphql`
        query {
            allStrapiPaginas(filter: { nombre: { eq: "Inicio" } }) {
              nodes {
                id
                nombre
                contenido
                imagen {
                  sharp: childImageSharp {
                    fluid( maxWidth: 1500 duotone: {
                      highlight: "#222222", shadow: "#192550", opacity: 30
                    }) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
        }
    `);

    return resultado.allStrapiPaginas.nodes[0] as IPagina;
}

export default usePaginaInicio;