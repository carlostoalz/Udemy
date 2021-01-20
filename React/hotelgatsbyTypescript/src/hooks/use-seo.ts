import { graphql, useStaticQuery } from 'gatsby';
import { ISEO } from '../interfaces/ISEO';

const useSeo = () => {

    const data = useStaticQuery(graphql`
        query {
            datoCmsSite {
              globalSeo {
                siteName
                fallbackSeo {
                  title
                  description
                }
              }
            }
          }
    `);

    return data.datoCmsSite.globalSeo as ISEO;
};

export default useSeo;