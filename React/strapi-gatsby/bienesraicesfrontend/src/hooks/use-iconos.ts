import { useStaticQuery, graphql } from "gatsby";
import { IIcono } from '../interfaces/IIcono';

const useIconos = () => {
    const resultado = useStaticQuery(graphql`
        query {
            iconos: allFile( filter: { relativeDirectory: { eq: "iconos" } } ) {
                edges {
                    node {
                        id
                        publicURL
                    }
                }
            }
        }
    `);
    return (resultado.iconos.edges as any[]).map(icono => ({
        id: icono.node.id,
        publicURL: icono.node.publicURL
    } as IIcono));
};

export default useIconos;
