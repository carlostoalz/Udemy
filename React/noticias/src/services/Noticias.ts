import axios from 'axios';
import { apiKey } from '../common/Categorias';

export const getNoticias = async (categoria: string) => {
    const url = `https://newsapi.org/v2/top-headlines?country=co&category=${categoria}&apiKey=${apiKey}`;
    const respuesta = await axios.get(url);
    return respuesta.data.articles as any[];
};