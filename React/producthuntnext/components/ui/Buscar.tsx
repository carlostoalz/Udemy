import React from 'react';
import { InputText, FormBuscar, ButtonSubmit } from '../../style/Styled';

const Buscar = () => {
    return (
        <FormBuscar>
            <InputText 
                type="text"
                placeholder="Buscar productos"
                />
            <ButtonSubmit type="submit" />
        </FormBuscar>
    );
};

export default Buscar;
