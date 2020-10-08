import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';
import { IBusqueda } from './interfaces/IBusqueda';
import { IResultado } from './interfaces/IResultado';

function App() {

  const [ busqueda, guardarBusqueda ] = useState<IBusqueda>({
      ciudad: '',
      pais: ''
  });
  const [ consultar, guadarConsultar ] = useState(false);
  const [ resultado, guardarResultado ] = useState<IResultado | any>({});
  const [ error, guardarError ] = useState(false);


  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {

      if(consultar) {
        const appId = "b938313d9043b6222b2724b0655618a3";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guadarConsultar(false);

        // Detecta si hubo resultados correctos en la consulta
        if ((resultado as IResultado).cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
  }, [consultar, ciudad, pais]);

  let componente:JSX.Element;

  if (error) {
    componente = <Error mensaje="no Hay resultados"/>;
  } else {
    componente =  <Clima resultado={resultado}/>;
  }

  return (
    <Fragment>
      <Header
        titulo="Clima React App"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guadarConsultar={guadarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
