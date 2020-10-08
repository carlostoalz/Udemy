import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Imagenes from './components/Imagenes';
import { consultarAPIPixaby } from './services/APICall';
import { IImagenes } from './interfaces/IImagenes';

const App = () => {

  // State de la app
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState<any[]>([]);
  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(0);
  
  useEffect( () => {
    if (busqueda.trim() === '') return;    
    const llamadoAPI = async () => {
      const respuesta:IImagenes = await consultarAPIPixaby(busqueda, paginaActual);
      guardarImagenes(respuesta.hits);
      guardarTotalPaginas(respuesta.totalHits);
      //mover hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron?.scrollIntoView({ behavior: 'smooth' });
    }
    llamadoAPI();
  }, [busqueda, paginaActual]);

  // Definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  // Definir la página siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <Imagenes imagenes={imagenes} />

        { (paginaActual === 1) ? null : <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>&laquo; Anterior</button>}
        { (paginaActual === totalPaginas) ? null : <button type="button" className="btn btn-info" onClick={paginaSiguiente}>Siguiente &raquo;</button>}
      </div>
    </div>
  );
}

export default App;
