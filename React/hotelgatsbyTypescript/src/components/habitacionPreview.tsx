import React, { FC } from 'react';
import { IHabitacion } from '../interfaces/IHabitacion';
import Image from 'gatsby-image';
import { css } from '@emotion/react'
import { Boton } from '../styled';
type HabitacionPreviewProps = {
    habitacion: IHabitacion
}

const HabitacionPreview: FC<HabitacionPreviewProps> = ({habitacion}) => {
    return (
        <div
            css={css`
                border: 1px solid #e1e1e1;
                margin-bottom: 2rem;
            `}
        >
            <Image
                fluid={habitacion.imagen.fluid}
            />
            <div
                css={css`
                    padding: 3rem;
                `}
            >
                <h3
                    css={css`
                        font-size: 3rem;
                    `}
                >{habitacion.titulo}</h3>
                <p>{habitacion.contenido}</p>

                <Boton to={habitacion.slug}>Ver habitación</Boton>
            </div>
        </div>
    );
};

export default HabitacionPreview;