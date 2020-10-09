import { IProyecto } from './IProyecto';

export interface IProyectoContext {
    proyectos: IProyecto[];
    formulario: boolean;
    errorFormulario: boolean;
    proyecto: IProyecto | null;
    mensaje?: any;
    mostrarFormulario: () => void;
    obtenerProyectos: () => void;
    agregarProyecto: (proyecto: IProyecto) => void;
    mostrarError: () => void;
    proyectoActual: (proyectoid: string) => void;
    eliminarProyecto: (proyectoid: string) => void;
}