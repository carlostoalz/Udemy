import React, { useState, useEffect } from 'react';
import { IFrase } from './interfaces/IFrase';
import Frase from './components/Frase';
import { Contenedor, Boton } from './common/Styled';

function App() {

  const [ frase, guardarFrase ] = useState<IFrase>({ quote: '', author: '' });

  const consultarAPI = async () => {
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const frase = await api.json();
    guardarFrase(frase[0]);
  };

  // Cargar una frase 
  useEffect( () => {
    consultarAPI();
  }, []);

  return (
    <Contenedor>
      <Frase
        frase={frase}
      />
      <Boton
        onClick={consultarAPI}
      >
        Obtener Frase
      </Boton>
    </Contenedor>
  );
}

export default App;
