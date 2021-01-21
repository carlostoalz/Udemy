import { IAgente } from './IAgente';
import { ICategoria } from './ICategoria';

export interface IPropiedad {
    id: string;
    nombre: string;
    precio: string;
    estacionamiento: number;
    habitaciones: number;
    wc: number;
    descripcion: string;
    agentes: IAgente;
    categorias: ICategoria;
    imagen: {
        sharp: {
            fluid: {
                aspectRatio: number;
                base64: string;
                sizes: string;
                src: string;
                srcSet: string;
                srcSetWebp: string;
                srcWebp: string;
            }
        };
    }
}