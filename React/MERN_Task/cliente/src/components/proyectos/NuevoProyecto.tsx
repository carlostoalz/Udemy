import React, { Fragment, useState, SyntheticEvent, useContext } from 'react';
import { IProyecto } from '../../interfaces/IProyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { IProyectoContext } from '../../interfaces/IProyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext) as IProyectoContext;
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    // State para proyecto
    const [ proyecto, guardarProyecto ] = useState<IProyecto>({
        _id: '',
        nombre: ''
    });

    // Lee los contenidos del input
    const onChangeProyecto = (e: React.ChangeEvent<HTMLInputElement>) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        } as any)
    }


    // Cuando el usario envia un proyecto
    const onSubmitPoyecto = (e:SyntheticEvent) => {
        e.preventDefault();

        // Validar el proyecto
        if(proyecto.nombre === '') {
            mostrarError();
            return;
        }

        // Agregar al state
        agregarProyecto(proyecto);

        // Reiniciar el form
        guardarProyecto({
            _id: '',
            nombre: ''
        })
    };

    const onClickFormulario = () => {
        mostrarFormulario();
    };

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>
    
            {
                formulario ?
                    (
                        <form 
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitPoyecto}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                value={proyecto?.nombre}
                                onChange={onChangeProyecto}
                            />

                            <input 
                                type="submit" 
                                className="btn btn-primario btn-block"
                                value="Agregar proyecto"
                            />
                        </form>
                    )
                :
                    null
            }

            {
                errorFormulario ?
                    (
                        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                    )
                :
                    null
            }
        </Fragment>
    );
};

export default NuevoProyecto;