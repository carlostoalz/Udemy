import { IBaseState } from './IBaseState';
import { IPropiedad } from './IPropiedad';
export interface IPropiedadState extends IBaseState {
    propiedades?: IPropiedad[];
}