import axios from 'axios';
import { IBusqueda } from '../interfaces/IBusqueda';

export const getIngredients = async (): Promise<any[]> => {
    
    const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`;
    const resultado = await axios.get(url);
    return resultado.data.drinks as any[];

};

export const getCategories = async (): Promise<any[]> => {
    
    const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
    const resultado = await axios.get(url);
    return resultado.data.drinks as any[];
};

export const getRecipes = async (busqueda: IBusqueda): Promise<any[]> => {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`;
    const resultado = await axios.get(url);
    return resultado.data.drinks as any[];

}

export const getDrink = async (id:string): Promise<any> => {
    
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const resultado = await axios.get(url);
    return resultado.data.drinks[0];

};