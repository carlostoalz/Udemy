import { IValidatorCrearCuenta } from "../interfaces/validations";

export const validateCrearCuenta = (valores: IValidatorCrearCuenta) => {
    let errores = {} as IValidatorCrearCuenta;

    // Validar el nombre del usuario
    if (!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // Validar el email
    if(!valores.email) {
        errores.email = "el email es obligatorio";
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
        errores.email = "Email no valido"
    }

    // Validar el password
    if (!valores.password) {
        errores.password = "El password es obligatorio"
    } else if(valores.password.length < 6) {
        errores.password = "El password debe ser de al menos 6 caracteres";
    }

    return errores;
};