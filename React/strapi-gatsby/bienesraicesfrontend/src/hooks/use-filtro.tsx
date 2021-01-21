import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Formulario, Select } from '../styles';

const useFiltro = () => {

    const [ categoria, setCategoria ] = useState('');

    const resultado = useStaticQuery(graphql`
        query {
            categorias: allStrapiCategorias {
                nodes {
                    id
                    nombre
                }
            }
        }
    `);

    const categorias = resultado.categorias.nodes as { id: string; nombre: string }[];
    
    const FiltroUI = () => (
        <Formulario>
            <Select
                onChange={ e => setCategoria(e.target.value) }
                value={categoria}
            >
                <option value="">-- Filtrar --</option>
                { categorias.map(opcion => (
                    <option key={opcion.id} value={opcion.nombre}>{ opcion.nombre }</option>
                )) }
            </Select>
        </Formulario>
    )

    return {
        categoria,
        FiltroUI
    };
};

export default useFiltro