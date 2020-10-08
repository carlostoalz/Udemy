import React, { useState, SyntheticEvent } from 'react';
import { IBusqueda } from '../interfaces/IBusqueda';
import Error from './Error';
import PropTypes from 'prop-types';

type FormularioProps = {
    busqueda: IBusqueda,
    guardarBusqueda: React.Dispatch<React.SetStateAction<IBusqueda>>,
    guadarConsultar: React.Dispatch<React.SetStateAction<boolean>>
}

const Formulario = ({busqueda, guardarBusqueda, guadarConsultar}:FormularioProps) => {

    // state del formulario
    const [ error, guardarError ] = useState(false);

    const { ciudad, pais } = busqueda;

    // Función que coloca los elementos en state
    const hadleChange = (e:SyntheticEvent) => {
        // Actualizar State
        let target: HTMLInputElement = e.target as HTMLInputElement;
        guardarBusqueda({
            ...busqueda,
            [target.name] : target.value
        });
    };

    // Cuando el usuario da submit al form
    const handleSubmit = (e:SyntheticEvent) => {
        e.preventDefault();

        // Validación
        if (ciudad.trim() === '' || pais.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        guadarConsultar(true);

    };

    return(
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/>:null}
            <div className="input-field col s12">
                <input 
                    type="text" 
                    name="ciudad" 
                    id="ciudad"
                    value={ciudad}
                    onChange={hadleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select 
                    name="pais" 
                    id="pais"
                    value={pais}
                    onChange={hadleChange}
                >
                    <option value="">-- Seleccione un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col s12">
                <input 
                    type="submit" 
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    );
}

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired, 
    guardarBusqueda: PropTypes.func.isRequired, 
    guadarConsultar: PropTypes.func.isRequired
}

export default Formulario;