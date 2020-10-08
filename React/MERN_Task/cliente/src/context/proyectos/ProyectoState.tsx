import React, { useReducer } from 'react';
import uuid from 'uuid'
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import { IProyectoState } from '../../interfaces/IProyectoState';
import { IProyectoAction } from '../../interfaces/IProyectoAction';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types';
import { IProyecto } from '../../interfaces/IProyecto';

const proyectos: IProyecto[] = [
    { id: "1", nombre: 'Tienda Virtual' },
    { id: "2", nombre: 'intranet' },
    { id: "3", nombre: 'Diseño Sitio Web' }
];

const ProyectoState = (props:any) => {

    const initialState: IProyectoState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null
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
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    };

    // Agregar nuevo proyecto
    const agregarProyecto = (proyecto: IProyecto) => {
        proyecto.id = uuid.v4();

        // Insertar el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        });
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
    const eliminarProyecto = (proyectoid: string) => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoid
        });
    };

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
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