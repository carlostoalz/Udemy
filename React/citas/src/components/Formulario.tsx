import React, { Fragment, useState } from 'react';
import {v4} from 'uuid'
import PropTypes from 'prop-types'


const Formulario = ({crearCita}:any) => {

    // Crear State de Citas
    const [cita, actualizarCita] : any = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [error, actualizarError] = useState(false);

    // Función que se ejecuta cade que un usario escribe en un imput
    const actualizarState = (e: any) => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        });
    };

    // Cuando el usuario preciona agregar cita
    const submitCita = (e: any) => {
        e.preventDefault();  
        
        // Validar
        if (mascota.trim() === '' || 
            propietario.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintomas.trim() === '') {
            actualizarError(true);
            return;
        }

        // Eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = v4();

        // Crear la Cita
        crearCita(cita)

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    };

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

            <form
                onSubmit={submitCita}>
                <label htmlFor="mascota">Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label htmlFor="propietario">Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label htmlFor="fecha">Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label htmlFor="hora">Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label htmlFor="sintomas">Sintomas</label>
                <textarea 
                    name="sintomas" 
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
};


Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;