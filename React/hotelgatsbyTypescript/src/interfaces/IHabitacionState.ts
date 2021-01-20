import { IHabitacion } from './IHabitacion';

export interface IHabitacionState {
    habitacion?: IHabitacion;
    habitaciones?: IHabitacion[];
    loading: boolean;
    error: boolean | null;
}