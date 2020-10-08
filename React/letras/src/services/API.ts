import { IBusqueda } from '../interfaces/IBusqueda';
import axios from 'axios'

export const getAPILetra = async (busqueda: IBusqueda) => {
    const url: string = `https://api.lyrics.ovh/v1/${busqueda.artista}/${busqueda.cancion}`;
    const resultado = await axios.get(url);
    return resultado.data.lyrics as string;
};

export const getAPIArtista = async (busqueda: IBusqueda) => {
    const url: string = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${busqueda.artista}`;
    const resultado = await axios.get(url);
    return resultado.data.artists[0];
};