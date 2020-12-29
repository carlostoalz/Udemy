import React from 'react';
import Link from 'next/link';
import { HeaderStyle, ContenedorHeader, Logo, Boton, Flex, PMarginRight, DivLogo } from '../../style/Styled';

import Buscar from '../ui/Buscar';
import Navegacion from './Navegacion';

const Header = () => {

    const usuario: boolean = false;

    return (
        <HeaderStyle>
            <ContenedorHeader>
                <DivLogo>
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>

                    <Buscar />

                    <Navegacion />
                </DivLogo>

                <Flex>
                    { usuario ? (
                        <>
                            <PMarginRight>Hola: Carlos</PMarginRight>
                            <Boton 
                                type="button"
                                bgColor="true"
                            >Cerrar Sesión</Boton>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Boton
                                    bgColor="true"
                                >Login</Boton>
                            </Link>
                            <Link href="/crear-cuenta">
                                <Boton>Crear Cuenta</Boton>
                            </Link>
                        </>
                    )}
                </Flex>
            </ContenedorHeader>
        </HeaderStyle>
    );
};

export default Header;