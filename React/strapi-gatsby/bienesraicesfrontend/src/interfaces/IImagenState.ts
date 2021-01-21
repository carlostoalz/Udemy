import { IBaseState } from './IBaseState';
import { ILogo } from './ILogo';
import { IBanner } from './IBanner';
import { IIcono } from './IIcono';
export interface IImagenState extends IBaseState {
    logo?: ILogo;
    banner?: IBanner;
    iconos?: IIcono[];
}