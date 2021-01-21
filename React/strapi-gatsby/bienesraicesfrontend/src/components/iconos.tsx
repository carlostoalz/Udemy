import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerIconosAction } from '../store/actions/imagen.action';
import { IImagenState } from '../interfaces/IImagenState';
import { IIcono } from '../interfaces/IIcono';
import { ListadoIconos } from '../styles/index';

type IconosProps = {
    wc: number;
    estacionamiento: number;
    habitaciones: number;
}

const Iconos: FC<IconosProps> = (props) => {
    const dispatch = useDispatch();
    const cargarIconos = () => dispatch( obtenerIconosAction() );
    cargarIconos();

    const wIconos: IIcono[] = useSelector( (state: any) => (state.imagenes as IImagenState).iconos as any[] );

    return (
        <ListadoIconos>
            <li>
                { <img src={wIconos.filter(icono => icono.publicURL.indexOf("icono_wc.svg") > 0)[0].publicURL} alt="icono_wc"/> }
                <p>{props.wc}</p>
            </li>
            <li>
                { <img src={wIconos.filter(icono => icono.publicURL.indexOf("icono_estacionamiento.svg") > 0)[0].publicURL} alt="icono_estacionamiento"/> }
                <p>{props.estacionamiento}</p>
            </li>
            <li>
                { <img src={wIconos.filter(icono => icono.publicURL.indexOf("icono_dormitorio.svg") > 0)[0].publicURL} alt="icono_habitacion"/> }
                <p>{props.habitaciones}</p>
            </li>
        </ListadoIconos>
    );
};

export default Iconos;