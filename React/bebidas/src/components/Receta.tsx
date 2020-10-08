import React, { useContext, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { ModalContext } from '../context/ModalContext';
import { getModalStyle, useStyles } from '../common/styles';
import { IModalStyle } from '../interfaces/IModalStyle';

type RecetaProps = {
    receta: any
}

const Receta = (props:RecetaProps) => {

    // Configuración del modal de material-ui
    const [ modalStyle ] = useState<IModalStyle>(getModalStyle());
    const [ open, setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleCLose = () => {
        setOpen(false);
    };

    // Extraer los valores del context 
    const { receta ,guardarIdReceta, guardarReceta } = useContext(ModalContext);

    const mostrarIngredientes = (informacion: any) => {
        let ingredientes = [];
        for(let i = 1; i < 16; i++) {
            if( informacion[`strIngredient${i}`] ) {
                ingredientes.push(
                    <li>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>
                );
            }
        }

        return ingredientes;
    };

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{props.receta.strDrink}</h2>
                <img className="card-img-top" src={props.receta.strDrinkThumb} alt={`Imágen de ${props.receta.strDrink}`}/>
                <div className="card-body">
                    <button 
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={ () => {
                            guardarIdReceta(props.receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver Receta
                    </button>

                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({});
                            handleCLose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{receta.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {receta.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={receta.strDrinkThumb} alt=""/>
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                { mostrarIngredientes(receta) }
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

Receta.propTypes = {
    receta: PropTypes.object.isRequired
}

export default Receta