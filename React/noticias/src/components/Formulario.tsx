import React, { SyntheticEvent } from 'react';
import styles from './Formulario.module.css'
import useSelect from '../hooks/useSelect';
import PropTypes from 'prop-types'


type FormularioProps = {
    guardarCategoria: React.Dispatch<React.SetStateAction<string>>
}

const Formulario = ({guardarCategoria}:FormularioProps) => {

    // Utilizar custom hook
    const [ categoria, SelectNoticias ] = useSelect('general');

    const buscarNoticias = (e : SyntheticEvent) => {
        e.preventDefault();
        guardarCategoria(categoria as string);
    };


    return (
        <div className={`${styles.buscador} row`}>
            <div className="col s12 m8 offset-m2">
                <form
                    onSubmit={buscarNoticias}
                >
                    <h2 className={styles.heading}>Encuentra noticias por categoría</h2>

                    <SelectNoticias />

                    <div className="input-field col s12">
                        <input 
                            type="submit"
                            className={`${styles['btn-block']} btn-large amber darken-2`}
                            value="Buscar"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

Formulario.propTypes = {
    guardarCategoria: PropTypes.func.isRequired
};

export default Formulario;