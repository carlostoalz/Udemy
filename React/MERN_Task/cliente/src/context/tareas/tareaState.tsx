import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import { ITareaState } from '../../interfaces/ITareaState';
import { ITareaAction } from '../../interfaces/ITareaAction';
import { ITarea } from '../../interfaces/ITarea';
import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA, TAREA_ERROR } from '../../types/index';
import { IResultado } from '../../interfaces/IResultado';
import { ActualizarTarea, AgregarTarea, EliminarTarea, ObtenerTareas } from '../../services/tarea.service';
import { handleError } from '../../common/handleError';

const TareaState = (props: any) => {

    const initialState: ITareaState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
        mensaje: null
    };

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer<(state: ITareaState, action: ITareaAction) => ITareaState>(TareaReducer, initialState);

    // Crear las funciones

    //obtener las tareas de un proyecto
    const obtenerTareas = async (proyectoId: string) => {
        try {

            const resultado: IResultado<ITarea[]> = await ObtenerTareas(proyectoId);
            if (resultado.exitoso) {
                dispatch({
                    type: TAREAS_PROYECTO,
                    payload: resultado.datos
                });                
            }

        } catch (error) {
            handleError(error, dispatch, TAREA_ERROR);
        }
    };

    // Agregar tarea al proyecto seleccionado
    const agregarTarea = async (tarea: ITarea) => {

        try {
            const resultado: IResultado<ITarea> = await AgregarTarea(tarea);
            if (resultado.exitoso) {
                dispatch({
                    type: AGREGAR_TAREA,
                    payload: resultado.datos
                });
            }
        } catch (error) {
            handleError(error, dispatch, TAREA_ERROR);
        }

    };

    // Valida y muestra un error en caso que sea nesesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        });
    };

    // Elimanar tarea por su id
    const eliminarTarea = async (id: string, idProyectoActual: string) => {
        
        try {
            const resultado: IResultado<null> = await EliminarTarea(id, idProyectoActual);

            if (resultado.exitoso) {
                dispatch({
                    type: ELIMINAR_TAREA,
                    payload: id
                });
            }
        } catch (error) {
            handleError(error, dispatch, TAREA_ERROR);
        }

    };

    // Edita una tarea 
    const actualizarTarea = async (tarea: ITarea) => {
        
        try {

            const resultado: IResultado<ITarea> = await ActualizarTarea(tarea);
            if (resultado.exitoso) {     
                dispatch({
                    type: ACTUALIZAR_TAREA,
                    payload: resultado.datos
                });
            }

        } catch (error) {
            handleError(error, dispatch, TAREA_ERROR);
        }

    };

    // Extrae una tarea para edición
    const guardarTareaActual = (tarea: ITarea) => {
        dispatch({
            type: TAREA_ACTUAL,
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
                tareasproyecto: state.tareasproyecto,
                tareaseleccionada: state.tareaseleccionada,
                errortarea: state.errortarea,
                mensaje: state.mensaje,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
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