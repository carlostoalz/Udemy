import { useStaticQuery, graphql } from "gatsby";
import { IBanner } from "../interfaces/IBanner";

const useBanner = () => {
    
    const resultado = useStaticQuery(graphql`
        query {
            banner: file(relativePath: { eq: "encuentra.jpg" }) {
                sharp: childImageSharp {
                    fluid( maxWidth: 1500 ) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    `);

    return resultado.banner as IBanner;
};

export default useBanner;