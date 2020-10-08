import { IMoneda } from '../interfaces/IMoneda';
export const getCurrency = async () => {
    
    const url = 'https://openexchangerates.org/api/currencies.json';
    const respuesta = await fetch(url);
    const resultado: any = await respuesta.json();

    let monedas: IMoneda[] = [];

    Object.keys(resultado).forEach((currency) => {
        monedas.push({ codigo: currency, nombre: resultado[currency] })
    });

    return monedas;
};