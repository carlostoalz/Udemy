import { IAlerta } from './IAlerta';

export interface IAlertaContext {
    alerta: IAlerta;
    mostrarAlerta: (msg: string, categoria: string) => void;
}