import { IBaseState } from './IBaseState';
import { IEnlace } from './IEnlace';

export interface IArchivoState extends IBaseState {
    archivo?: IEnlace
}