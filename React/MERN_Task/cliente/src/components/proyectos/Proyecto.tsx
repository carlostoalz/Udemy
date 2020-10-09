import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { IProyecto } from '../../interfaces/IProyecto';
import { IProyectoContext } from '../../interfaces/IProyectoContext';
import { ITareaContext } from '../../interfaces/ITareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

type ProyectoProps = {
    proyecto:IProyecto
}

const Proyecto = ({proyecto}:ProyectoProps) => {


    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext) as IProyectoContext;
    const { proyectoActual } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(TareaContext) as ITareaContext;
    const { obtenerTareas } = tareasContext;

    // Función para agregar el proyecto actual
    const seleccionarProyecto = (id:string) => {
        proyectoActual(id); // Fijar un proyecto actual
        obtenerTareas(id); // Filtrar las tareas cuando se de click
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    );
};

Proyecto.propTypes = {
    proyecto : PropTypes.object.isRequired
};

export default Proyecto;