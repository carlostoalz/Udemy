import axios from 'axios';

export const getCotizacion = async (cripotomoneda: string, moneda:string) => {
    const url: string = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripotomoneda}&tsyms=${moneda}`;
    const resultado = await axios.get(url);
    return resultado.data.DISPLAY[cripotomoneda][moneda];
};