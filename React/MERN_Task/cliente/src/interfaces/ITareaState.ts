import { ITarea } from './ITarea';
export interface ITareaState {
    
    tareasproyecto: ITarea[];
    tareaseleccionada: ITarea | null
    errortarea: boolean;
    mensaje?: any;

}