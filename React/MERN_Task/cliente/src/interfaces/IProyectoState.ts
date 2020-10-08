import { IProyecto } from './IProyecto';

export interface IProyectoState {
    proyectos: IProyecto[];
    formulario: boolean
    errorFormulario: boolean;
    proyecto: IProyecto | null
}