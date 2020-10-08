import React, { useState, SyntheticEvent } from 'react';
import { Boton } from '../common/Styled';
import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptoMoneda';
import Error from './Error';
import PropTypes from 'prop-types';


type FormularioProps = {
    guardarMoneda: React.Dispatch<React.SetStateAction<string>>,
    guardarCriptomoneda: React.Dispatch<React.SetStateAction<string>>
};

const Formulario = ({guardarMoneda,guardarCriptomoneda}:FormularioProps) => {

    // Utilizar useMoneda
    const [moneda, Seleccionar] = useMoneda('Elige tu moneda', '');
    const SelectMonedas = Seleccionar as () => JSX.Element;

    // Utilizar useCriptoMoneda
    const [criptoMoneda, SelCripto] = useCriptoMoneda('Elige tu Criptomoneda', '');
    const SelectCripto = SelCripto as () => JSX.Element;

    const [error, setError] = useState(false);


    //Cuando el usuario hace submit
    const cotizarMoneda = (e: SyntheticEvent) => {
        e.preventDefault();

        // Validar si ambos campos estan llenos
        if (moneda === '' || criptoMoneda === '') {
            setError(true);
            return;
        }

        // Pasar los datos al componente principal
        setError(false);

        guardarMoneda(moneda as string);
        guardarCriptomoneda(criptoMoneda as string);
    };

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas/>
            <SelectCripto/>
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomoneda: PropTypes.func.isRequired
};

export default Formulario;