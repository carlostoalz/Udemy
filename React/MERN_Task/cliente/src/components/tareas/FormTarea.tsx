import React, { useContext, SyntheticEvent, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import { IProyectoContext } from '../../interfaces/IProyectoContext';
import { ITarea } from '../../interfaces/ITarea';
import { ITareaContext } from '../../interfaces/ITareaContext';

const FormTarea = () => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext) as IProyectoContext;
    const { proyecto } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(TareaContext) as ITareaContext;
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea selecciuonada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                id: '',
                estado: false,
                nombre: '',
                proyectoId: ''
            });
        }
    }, [tareaseleccionada]);

    // State del formulario
    const [ tarea, guardarTarea ] = useState<ITarea>({
        id: '',
        estado: false,
        nombre: '',
        proyectoId: ''
    });

    if(!proyecto) return null;

    // Leer los valores del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        } as ITarea);
    };

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        let wTarea: ITarea = {...tarea} as ITarea;

        // Validar
        if(!wTarea || wTarea.nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Si es edición o si es nueva tarea
        if(tareaseleccionada === null) {
            // Tarea nueva
            //agragar nueva tarea al state de tareas
            wTarea.proyectoId = proyecto.id;
            wTarea.estado = false;
            agregarTarea(wTarea);
        } else {
            // Actualizar tarea
            actualizarTarea(wTarea);

            // ELimina tareaseleccionada del state
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyecto.id);

        // Reiniciar el form
        guardarTarea({
            id: '',
            estado: false,
            nombre: '',
            proyectoId: ''
        });
    };

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={tarea?.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>

            {errortarea ?<p className="mensaje error">El nombre de la tarea es obligatorio</p>:null}
        </div>
    );
}

export default FormTarea;