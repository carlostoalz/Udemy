import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { IProyectoContext } from '../../interfaces/IProyectoContext';

const ListadoProyectos = () => {

    // Extraer proyecos del state inicial
    const proyectosContext = useContext(proyectoContext) as IProyectoContext;
    const { proyectos, obtenerProyectos } = proyectosContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    }, []);

    // Revisar si hay proyectos
    if (proyectos.length === 0) return <p>No hay proyectos comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {proyectos.map( (proyecto, index:number) => (
                    <CSSTransition
                        key={index}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto} 
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;