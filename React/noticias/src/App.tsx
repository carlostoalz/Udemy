import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import { getNoticias } from './services/Noticias';
import Noticias from './components/Noticias';

function App() {

  // Definir la categoría y noticias
  const [categoria, guardarCategoria] = useState<string>('');
  const [noticias, guardarNoticias] = useState<any[]>([]);

  useEffect(() => {
    
    const consultarAPI = async () => {
      guardarNoticias(await getNoticias(categoria));
    };

    consultarAPI();

  }, [categoria]);

  return (
    <Fragment>
      <Header titulo="Buscador de Noticias"/>
      <div className="container white">
        <Formulario 
          guardarCategoria={guardarCategoria}
        />
        <Noticias noticias={noticias} />
      </div>
    </Fragment>
  );
}

export default App;
