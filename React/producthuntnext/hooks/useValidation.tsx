import React, { useState, useEffect } from 'react';
import { IValidationHook } from '../interfaces/IValitationHook';

const useValidation = <V extends object>(stateInicial: V, validar: (valores: V) => V, fn: () => void ) : IValidationHook<V> => {

    const [ valores, setValores ] = useState(stateInicial);
    const [ errores, setErrores ] = useState<V>({} as V);
    const [ submitForm, setSubmitForm ] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrores: boolean = Object.keys(errores).length === 0;
            if (noErrores) {
                fn(); // fn = función  que se ejecuta en el componente
            }
            setSubmitForm(false);
        }
    }, [errores]);

    // Función que se ejecuta conforme el usuario escribe algo 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    };

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    };

    // Función de cuando se realiza el evento de blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
    };

    return {
        valores,
        errores,
        submitForm,
        handleSubmit,
        handleChange,
        handleBlur
    };
};

export default useValidation;