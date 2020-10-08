import axios from 'axios';
import { IImagenes } from '../interfaces/IImagenes';

export const consultarAPIPixaby = async (termino:string, paginaActual: number) => {
    const imagenesPorPagina: number = 30;
    const key = "17997227-782fa404548f92a6f1e77c9e3";
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
    const resultado = await axios.get(url);
    const imagenes: IImagenes = {
        hits: resultado.data.hits as any[],
        totalHits: Math.ceil(resultado.data.totalHits / imagenesPorPagina)
    }
    return imagenes;
};