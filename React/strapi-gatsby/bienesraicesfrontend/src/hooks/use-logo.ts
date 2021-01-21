import { graphql, useStaticQuery } from 'gatsby';
import { ILogo } from '../interfaces/ILogo';

const useLogo = () => {

    const { logo } = useStaticQuery(graphql`
        query {
            logo: file(relativePath: { eq: "logo.svg" }) {
                publicURL
          }
        }
    `);

    return logo as ILogo;
};

export default useLogo;