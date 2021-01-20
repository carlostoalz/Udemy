import { graphql, useStaticQuery } from 'gatsby';
import { IPagina } from '../interfaces/IPagina';

export const ObtenerPagina = (slug: string): IPagina => {
  const paginas = useStaticQuery(graphql`
    query {
      allDatoCmsPagina {
        nodes {
          titulo
          contenido
          slug
          imagen {
            fluid {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  `);

  return (paginas.allDatoCmsPagina.nodes as IPagina[]).filter(p => p.slug === slug)[0];
};