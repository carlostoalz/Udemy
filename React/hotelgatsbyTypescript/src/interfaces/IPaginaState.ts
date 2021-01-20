import { IPagina } from './IPagina';
export interface IPaginaState {
    pagina?: IPagina;
    loading: boolean;
    error: boolean | null;
}