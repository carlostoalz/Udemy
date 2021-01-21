import React, { FC, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerPropiedadesAction } from '../store/actions/propiedad.action';
import { IPropiedad } from '../interfaces/IPropiedad';
import { IPropiedadState } from '../interfaces/IPropiedadState';
import PropiedadPreview from './propiedadPreview';
import { ListadoPropiedades } from '../styles';
import useFiltro from '../hooks/use-filtro';

const Propiedades: FC = () => {

    const dispatch = useDispatch();
    const cargarPropiedades = () => dispatch( obtenerPropiedadesAction() );
    cargarPropiedades();
    const wPropiedades: IPropiedad[] = useSelector( (state: any) => (state.propiedades as IPropiedadState).propiedades as IPropiedad[] );
    const [ propiedades ] = useState(wPropiedades);
    const [ filtradas, setFiltradas ] = useState([] as IPropiedad[]);

    // Filtrado de propiedades 
    const { categoria ,FiltroUI } = useFiltro();
    
    useEffect(() => {   
        if (categoria) {
            const filtro = propiedades.filter(propiedad => propiedad.categorias.nombre === categoria);
            setFiltradas(filtro);
        } else {
            setFiltradas(propiedades);
        }
    }, [categoria, propiedades]);

    return (
        <>
            <h2
                css={css`
                    margin-top: 5rem;
                `}
            >Nuetras Propiedades</h2>

            { FiltroUI() }

            <ListadoPropiedades>
                { filtradas.map( propiedad => (
                    <PropiedadPreview 
                        key={ propiedad.id }
                        propiedad={propiedad}
                    />
                ))}
            </ListadoPropiedades>
        </>
    );
};

export default Propiedades;