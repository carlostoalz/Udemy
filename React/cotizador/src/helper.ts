// Obtiene la diferencia de años
export const obtenerDiferencia = (year: number) => {
    return new Date().getFullYear() - year;
}

// Calcula el total a pagar segun la marca
export const calcularMarca = (marca: string) : number => {
    let incremento: number = 0;

    switch(marca) {    
        case 'europeo':
            incremento = 1.30;
            break;
        case 'americano':
            incremento = 1.15;
            break;
        case 'asiatico':
            incremento = 1.05;
            break;
        default:
            break;
    }

    return incremento;
};

// Calcula el tipo de seguro
export const obtenerPlan = (plan: string) : number => {
    return (plan === 'basico' ? 1.20 : 1.50);
};

// Muestra la primer letra mayuscula
export const primerMayuscula = (texto: string) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
};