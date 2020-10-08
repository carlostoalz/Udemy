import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import { IProyectoContext } from '../../interfaces/IProyectoContext';
import { ITareaContext } from '../../interfaces/ITareaContext';

const Tareas = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext) as IProyectoContext;
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(TareaContext) as ITareaContext;
    const { tareasproyecto } = tareasContext;

    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    return (
        <Fragment>
            <h2>Proyecto: { proyecto?.nombre }</h2>
            <ul className="listado-tareas">
                {
                    (tareasproyecto.length === 0) ?
                        (<li className="tarea">No hay tareas</li>)
                    :
                        <TransitionGroup>
                            {tareasproyecto.map((tarea) => (
                                <CSSTransition
                                    key={tarea.id}
                                    timeout={200}
                                    classNames="tarea"
                                >
                                    <Tarea 
                                        tarea={tarea} 
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyecto(proyecto.id)}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}

export default Tareas;