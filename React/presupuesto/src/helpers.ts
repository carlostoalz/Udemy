export const revisarPresupuesto = (presupuesto: number, restante: number) => {
    let clase: string;

    if( (presupuesto / 4) > restante ) {
        clase = 'alert alert-danger';
    } else if ( (presupuesto / 2) > restante ) {
        clase = 'alert alert-warning';
    } else {
        clase = 'alsert alert-success';
    }

    return clase;
}