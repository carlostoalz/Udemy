import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertasContext';
import { IProyectoContext } from '../../interfaces/IProyectoContext';
import { IAlertaContext } from '../../interfaces/IAlertaContext';

const ListadoProyectos = (props: any) => {

    // Extraer proyecos del state inicial
    const proyectosContext = useContext(proyectoContext) as IProyectoContext;
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext as IAlertaContext;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        // Si hay un error
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje, props.history]);

    // Revisar si hay proyectos
    if (proyectos.length === 0) return <p>No hay proyectos comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
            <TransitionGroup>
                {proyectos.map( (proyecto, index:number) => (
                    <CSSTransition
                        key={index}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto} 
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;