import React, { useContext, SyntheticEvent, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import AlertaContext from '../../context/alertas/alertasContext';
import { IProyectoContext } from '../../interfaces/IProyectoContext';
import { ITarea } from '../../interfaces/ITarea';
import { ITareaContext } from '../../interfaces/ITareaContext';
import { IAlertaContext } from '../../interfaces/IAlertaContext';

const FormTarea = (props: any) => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext) as IProyectoContext;
    const { proyecto } = proyectosContext;

    // Obtener el state de tareas
    const tareasContext = useContext(TareaContext) as ITareaContext;
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea, mensaje } = tareasContext;

    // Obtener el state de alertas
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext as IAlertaContext;

    // Effect que detecta si hay una tarea selecciuonada
    useEffect(() => {

        // Si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                _id: '',
                estado: false,
                nombre: '',
                proyecto: ''
            });
        }
        // eslint-disable-next-line
    }, [tareaseleccionada, mensaje, props.history]);

    // State del formulario
    const [ tarea, guardarTarea ] = useState<ITarea>({
        _id: '',
        estado: false,
        nombre: '',
        proyecto: ''
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
            wTarea.proyecto = proyecto._id;
            agregarTarea(wTarea);
        } else {
            // Actualizar tarea
            actualizarTarea(wTarea);

            // ELimina tareaseleccionada del state
            limpiarTarea();
        }

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyecto._id);

        // Reiniciar el form
        guardarTarea({
            _id: '',
            estado: false,
            nombre: '',
            proyecto: ''
        });
    };

    return (
        <div className="formulario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
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