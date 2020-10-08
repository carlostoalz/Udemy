import { ITarea } from './ITarea';
export interface ITareaState {

    tareas: ITarea[];
    tareasproyecto: ITarea[];
    tareaseleccionada: ITarea | null
    errortarea: boolean;

}