import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en local Storage
  let citasIniciales: any = JSON.parse((localStorage.getItem('citas') as string));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas]: any = useState([]);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales]);

  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita: any) => {    
    guardarCitas([
      ...citas,
      cita
    ])
  }

  // Función que elimina una cita por su id
  const eliminarCita = (id:string) => {
    const nuevasCitas = (citas as Array<any>).filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo: string = (citas as Array<any>).length === 0 ? "Noo hay citas" : "Administra tus citas";

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita:any) => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={() => eliminarCita(cita.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
