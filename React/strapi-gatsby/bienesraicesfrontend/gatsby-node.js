const urlSlug = require('url-slug');

exports.createPages = async({ actions, graphql, reporter }) => {

    const resultado = await graphql(`
        query {
            paginas: allStrapiPaginas {
                nodes {
                    id
                    nombre
                }
            }
            propiedades: allStrapiPropiedades {
                nodes {
                    id
                    nombre
                }
            }
        }
    `);

    // si no hay resultados
    if (resultado.errors) {
        reporter.panic('No hubo resultados', resultado.errors);
    }

    // Si hay resultados generar los archivos estaticos
    const propiedades = resultado.data.propiedades.nodes;
    const paginas = resultado.data.paginas.nodes;
    // Crear los templates de paginas
    paginas.forEach(pagina => {
        actions.createPage({
            path: urlSlug(pagina.nombre),
            component: require.resolve('./src/components/paginaDinamica.tsx'),
            context: {
                id: pagina.id
            }
        })
    });
    // Crear los templates de propiedades
    propiedades.forEach(propiedad => {
        actions.createPage({
            path: urlSlug(propiedad.nombre),
            component: require.resolve('./src/components/propiedadDinamica.tsx'),
            context: {
                id: propiedad.id
            }
        })
    });

};