import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { obtenerHabitacionesAction } from "../store/actions/habitacion.action";
import { IHabitacion } from '../interfaces/IHabitacion';
import { IHabitacionState } from '../interfaces/IHabitacionState';
import HabitacionPreview from './habitacionPreview';
import { ListadoHabitaciones } from '../styled';

const Habitaciones: FC = () => {

    const dispatch = useDispatch();
    const cargarHabitaciones = () => dispatch( obtenerHabitacionesAction() );
    cargarHabitaciones();

    const habitaciones: IHabitacion[] = useSelector((state: any) => (state.habitaciones as IHabitacionState).habitaciones as IHabitacion[]);

    return (
        <>
            <h2
                css={css`
                    text-align: center;
                    margin-top: 5rem;
                    font-size: 3rem;
                `}
            >Nuestras Habitaciones</h2>

            <ListadoHabitaciones>{habitaciones.map((habitacion: IHabitacion) => (
                <HabitacionPreview 
                    key={habitacion.id}
                    habitacion={habitacion}
                />
            ))}</ListadoHabitaciones>
        </>
    );
};

export default Habitaciones;