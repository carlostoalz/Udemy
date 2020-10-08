import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import { IBusqueda } from './interfaces/IBusqueda';
import { getAPILetra, getAPIArtista } from './services/API';
import Cancion from './components/Cancion';
import Info from './components/Info';

const App = () => {

  const [ busquedaLetra, guardarBusquedaLetra ] = useState<any | IBusqueda>({});
  const [ letra, guardarLetra ] = useState<string>('');
  const [ info, guardarInfo ] = useState<object | any>({});

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) return;

    const consultarAPI = async () => {

      const [ letra, artista ] = await Promise.all([
        getAPILetra(busquedaLetra),
        getAPIArtista(busquedaLetra) 
      ]);

      guardarLetra(letra);
      guardarInfo(artista);
    };
    consultarAPI();
  }, [busquedaLetra, info]);

  return (
    <Fragment>
      <Formulario 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
