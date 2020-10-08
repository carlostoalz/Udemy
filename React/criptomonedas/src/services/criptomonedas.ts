import axios from 'axios';

export const getCriptomonedas = async () => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    const resultado = await axios.get(url);
    return resultado.data.Data;
};