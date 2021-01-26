import { IError } from './IError';
export interface IBaseState {
    loading: boolean;
    error: IError | null;
    mensaje: string;
}