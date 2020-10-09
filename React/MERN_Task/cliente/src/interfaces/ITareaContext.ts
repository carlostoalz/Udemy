import { ITarea } from './ITarea';

export interface ITareaContext {
    tareasproyecto: ITarea[];
    tareaseleccionada: ITarea | null;
    errortarea: boolean;
    mensaje?: any;
    obtenerTareas: (proyectoId: string) => Promise<void>;
    agregarTarea: (tarea: ITarea) => Promise<void>;
    validarTarea: () => void;
    eliminarTarea: (id: string, idProyectoActual: string) => Promise<void>;
    guardarTareaActual: (tarea: ITarea) => void;
    actualizarTarea: (tarea: ITarea) => Promise<void>;
    limpiarTarea: () => void;
}