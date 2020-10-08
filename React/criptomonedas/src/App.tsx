import React, { useState, useEffect } from 'react';
import { Contenedor, Imagen, Heading } from './common/Styled';
import imagen from './img/cryptomonedas.png';
import { getCotizacion } from './services/cotizacion';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState<object>({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      
      // evitamos la ejecución la primera vez
      if (moneda === '') return;

      // Mostrar Spinner
      guardarCargando(true);

      setTimeout(async () => {

        // cambiar el estado de cargando
        guardarCargando(false);

        // Guardar cotización
        guardarResultado(await getCotizacion(criptomoneda, moneda));
      }, 3000);
  
    };
    cotizarCriptomoneda();


  }, [moneda,criptomoneda]);

  const componente: JSX.Element = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;