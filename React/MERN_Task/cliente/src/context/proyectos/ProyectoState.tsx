import React, { useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { IProyectoState } from '../../interfaces/IProyectoState';
import { IProyectoAction } from '../../interfaces/IProyectoAction';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR } from '../../types';
import { IProyecto } from '../../interfaces/IProyecto';
import { InsertarProyecto, ObtenerProyectos, EliminarProyecto } from '../../services/proyecto.service';
import { IResultado } from '../../interfaces/IResultado';
import { handleError } from '../../common/handleError';

const ProyectoState = (props:any) => {

    const initialState: IProyectoState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    };


    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer<(state: IProyectoState, action: IProyectoAction) => IProyectoState>(proyectoReducer, initialState);

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    };

    //Obtener los proyectos
    const obtenerProyectos = async () => {

        try {

            const resultado: IResultado<any[]> = await ObtenerProyectos();
            if (resultado.exitoso) {
                dispatch({
                    type: OBTENER_PROYECTOS,
                    payload: resultado.datos
                });
            }
            
        } catch (error) {
            handleError(error, dispatch, PROYECTO_ERROR);
        }
    };

    // Agregar nuevo proyecto
    const agregarProyecto = async (proyecto: IProyecto) => {

        try {
            const resultado: IResultado<any> = await InsertarProyecto(proyecto);
            if (resultado.exitoso) {
                // proyecto.id = resultado.datos._id
                dispatch({
                    type: AGREGAR_PROYECTO,
                    payload: resultado.datos
                });
            }

            // Insertar el proyecto en el state
        } catch (error) {
            handleError(error, dispatch, PROYECTO_ERROR);
        }
    };

    // Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    };

    // Selecciona el Proyecto al que el usuario dio click
    const proyectoActual = (proyectoid: string) => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoid
        });
    };

    // Elimnina un proyecto
    const eliminarProyecto = async (proyectoid: string) => {

        try {

            const resultado: IResultado<null> = await EliminarProyecto(proyectoid);
            if (resultado.exitoso) {
                dispatch({
                    type: ELIMINAR_PROYECTO,
                    payload: proyectoid
                });   
            }
        } catch (error) {
            handleError(error, dispatch, PROYECTO_ERROR);
        }
    };

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    );
};

export default ProyectoState;