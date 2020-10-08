import React, { useState, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import { IBusqueda } from '../interfaces/IBusqueda';

type FormularioProps = {
    guardarBusquedaLetra: React.Dispatch<any>
};


const Formulario = ({guardarBusquedaLetra}:FormularioProps) => {

    const [busqueda, guardarBusqueda] = useState<IBusqueda>({
        artista: '',
        cancion: ''
    });

    const [ error, guardarError ] = useState(false);

    const actualizarState = (e:React.ChangeEvent<HTMLInputElement>) => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    };

    const { artista, cancion } = busqueda;


    // Consultar las API's 
    const buscarInformacion = (e: SyntheticEvent) => {
        e.preventDefault();

        if (artista.trim() === '' || cancion.trim() === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // Pasar al componente principal
        guardarBusquedaLetra(busqueda);
    };

    return (
        <div className="bg-info">
            { error ? <p className="alert alert-danger text-center p-2">Todos los campos son obligatorios</p> : null }
            <div className="container">
                <div className="row">
                    <form
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                        onSubmit={buscarInformacion}
                    >
                        <fieldset>
                            <legend className="text-center">Buscador letras canciones</legend>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre de la Canción"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

Formulario.propTypes = {
    guardarBusquedaLetra: PropTypes.func.isRequired
};

export default Formulario;
