import { ITarea } from './ITarea';

export interface ITareaContext {
    tareas: ITarea[];
    tareasproyecto: ITarea[];
    tareaseleccionada: ITarea | null;
    errortarea: boolean;
    obtenerTareas: (proyectoId: string) => void;
    agregarTarea: (tarea: ITarea) => void;
    validarTarea: () => void;
    eliminarTarea: (id: string) => void;
    cambiarEstadoTarea: (tarea: ITarea) => void;
    guardarTareaActual: (tarea: ITarea) => void;
    actualizarTarea: (tarea: ITarea) => void;
    limpiarTarea: () => void;
}