import { IBaseState } from './IBaseState';
import { IPagina } from './IPagina';
export interface IPaginaState extends IBaseState {
    pagina?: IPagina;
}