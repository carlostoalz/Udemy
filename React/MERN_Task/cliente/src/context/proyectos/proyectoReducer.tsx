import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types/index';
import { IProyectoState } from '../../interfaces/IProyectoState';
import { IProyectoAction } from '../../interfaces/IProyectoAction';

export default (state: IProyectoState, action: IProyectoAction) => {
    
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            };
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            };
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario:  false,
                errorFormulario: false
            };
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            };
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: state.proyectos.filter( proyecto => proyecto.id === action.payload )[0]
            };
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter( proyecto => proyecto.id !== action.payload ),
                proyecto: null
            }
        default: 
            return state;
    }

};