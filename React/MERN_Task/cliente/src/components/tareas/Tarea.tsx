import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { IProyectoContext } from '../../interfaces/IProyectoContext';
import { ITarea } from '../../interfaces/ITarea';
import { ITareaContext } from '../../interfaces/ITareaContext';
import { IProyecto } from '../../interfaces/IProyecto';

type TareaProps = {
    tarea: ITarea
};

const Tarea = ({tarea}:TareaProps) => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext) as IProyectoContext;
    const { proyecto } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(TareaContext) as ITareaContext;
    const { eliminarTarea, obtenerTareas, guardarTareaActual, actualizarTarea } = tareasContext;

    // Función que se ejecuta cuando el usuario presiona el btn de eliminar tarea
    const tareaEliminar = (id: string) => {
        eliminarTarea(id, (proyecto?._id as string));
        obtenerTareas((proyecto as IProyecto)._id);
    };

    // Función que modifica el estado de las tareas
    const cambiarEstado = (tarea: ITarea) => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }

        actualizarTarea(tarea);
    };

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = (tarea: ITarea) => {
        guardarTareaActual(tarea);
    };

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {
                    tarea.estado ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    );
}

Tarea.propTypes = {
    tarea: PropTypes.object.isRequired
};

export default Tarea;