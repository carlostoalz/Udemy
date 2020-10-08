import React from 'react';
import Gasto from './Gasto';
import PropTypes from 'prop-types'

const Listado = ({gastos} : any) => (
    <div className="gastos-realizados">
        <h2>Listado</h2>
        { (gastos as never[]).map((gasto: any) => (
            <Gasto
                key={gasto.id}
                gasto={gasto}
            />
        ))}
    </div>
);

Listado.protoType = {
    gastos: PropTypes.array.isRequired
}

export default Listado;