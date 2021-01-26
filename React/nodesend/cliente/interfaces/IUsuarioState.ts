import { IBaseState } from './IBaseState';
import { IUsuario } from './IUsuario';
export interface IUsuarioState extends IBaseState {
    token: string;
    autenticado: boolean;
    usuario: IUsuario | null;
}