import React, { useReducer } from 'react';
import uuid from 'uuid';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import { ITareaState } from '../../interfaces/ITareaState';
import { ITareaAction } from '../../interfaces/ITareaAction';
import { ITarea } from '../../interfaces/ITarea';
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA } from '../../types/index';

const TareaState = (props: any) => {

    const initialState: ITareaState = {
        tareas: [
            { id:'1',nombre: 'Elegir Plataforma', estado: true, proyectoId: "1" },
            { id:'2',nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: "1" },
            { id:'3',nombre: 'Elegir Hosting', estado: true, proyectoId: "2" },
            { id:'4',nombre: 'Elegir Plataforma', estado: true, proyectoId: "2" },
            { id:'5',nombre: 'Elegir Plataformas de pago', estado: false, proyectoId: "3" },
            { id:'6',nombre: 'Elegir Hosting', estado: true, proyectoId: "3" }
        ],
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    };

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer<(state: ITareaState, action: ITareaAction) => ITareaState>(TareaReducer, initialState);

    // Crear las funciones

    //obtener las tareas de un proyecto
    const obtenerTareas = (proyectoId: string) => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    };

    // Agregar tarea al proyecto seleccionado
    const agregarTarea = (tarea: ITarea) => {
        tarea.id = uuid.v4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        });
    };

    // Valida y muestra un error en caso que sea nesesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    };

    // Elimanar tarea por su id
    const eliminarTarea = (id: string) => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        });
    };

    // Cambia el estado de cada tarea
    const cambiarEstadoTarea = (tarea: ITarea) => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    };

    // Extrae una tarea para edición
    const guardarTareaActual = (tarea: ITarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    };

    // Edita o modifica una tarea 
    const actualizarTarea = (tarea: ITarea) => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        });
    };

    // Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        });
    }

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                tareaseleccionada: state.tareaseleccionada,
                errortarea: state.errortarea,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );

};

export default TareaState;