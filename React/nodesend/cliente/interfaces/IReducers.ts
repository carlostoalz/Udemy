import { IUsuarioState } from './IUsuarioState';
import { IArchivoState } from './IArchivoState';
import { IAlertaState } from './IAlertaState';
import { IEnlaceState } from './IEnlaceState';

export interface IReducers {
    usuarioState: IUsuarioState;
    archivoState: IArchivoState;
    alertaState: IAlertaState;
    enlaceState: IEnlaceState;
}