import React from 'react';
import { IFrase } from '../interfaces/IFrase';
import { ContenedorFrase } from '../common/Styled';

type FraseProps = {
    frase: IFrase
}

const Frase = ({ frase } : FraseProps) => {

   if(frase.author.trim() === "" || frase.quote.trim() === "") return null;

    return (
        <ContenedorFrase>
            <h1>{frase.quote}</h1>
            <p>{frase.author}</p>
        </ContenedorFrase>
    );
}

export default Frase;