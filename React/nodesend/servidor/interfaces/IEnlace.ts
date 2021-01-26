import { Schema } from "mongoose";

export interface IEnlace {
    id: string;
    url: string;
    nombre: string;
    nombre_original: string;
    descargas?: number;
    autor?: string;
    password?: string;
    creado?: Date;
}