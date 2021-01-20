import { graphql, useStaticQuery } from 'gatsby';
import { IHabitacion } from '../interfaces/IHabitacion';

const useHabitaciones = () => {

    const data = useStaticQuery(graphql`
        query {
            allDatoCmsHabitacion {
                nodes {
                    titulo
                    id
                    slug
                    contenido
                    imagen {
                        fluid(maxWidth:1200){
                            ...GatsbyDatoCmsFluid
                        }
                    }
                }
            }
        }
    `);
    
    return (data.allDatoCmsHabitacion.nodes as IHabitacion[]);    
};

export default useHabitaciones;