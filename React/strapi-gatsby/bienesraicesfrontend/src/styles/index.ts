import styled from '@emotion/styled';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 3rem;

    @media (min-width: 768px) {
        flex-direction: row;
        padding: 0;
    }
`;

export const NavLink = styled(Link)`
    color: #FFF;
    font-weight: 700;
    font-family: 'PT Sans', sans-serif;
    text-decoration: none;
    padding: .5rem;
    margin-right: 1rem;
    &:last-of-type {
        margin-right: 0;
    }
    &.pagina-actual {
        border-bottom: 2px solid #FFF;
    }
`;

export const ImagenBackground = styled(BackgroundImage)`
    height: 600px;
`;

export const Imagenbg = styled.div`
    color: #FFF;
    height: 100%;
    max-width: 1200px;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Titulo = styled.h1`
    font-size: 2rem;
    margin: 0;
    max-width: 800px;

    @media (min-width: 992px) {
        font-size: 4rem;
    }
`;

export const TituloBanner = styled.h3`
    font-size: 2rem;
    margin: 0;
    max-width: 800px;

    @media (min-width: 992px) {
        font-size: 4rem;
    }
`;

export const ImagenBackgroundBanner = styled(BackgroundImage)`
    height: 300px;
`;

export const ListadoIconos = styled.ul`
    display: flex;
    justify-content: space-between;
    flex: 1;
    max-width: 500px;
    margin: 3rem auto 0 auto;

    li {
        display: flex;

        img {
            margin-right: 1rem;
        }
    }
`;

export const Card = styled.div`
    border: 1px solid #E1E1E1;
    img {
        max-width: 100%
    }
`;

export const Contenido = styled.div`
    padding: 2rem;
    h3 {
        font-family: 'Lato', sans-serif;
        margin: 0 0 2rem 0;
        font-size: 2.4rem;
    }
    .precio {
        font-size: 2rem;
        color: #75AB00;
    }
`;

export const ListadoPropiedades = styled.ul`
    max-width: 120rem;
    width: 95%auto;
    margin: 4rem auto 0 auto;
    @media (min-width: 480px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 2rem;
        column-gap: 2rem;
    }
    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const Boton = styled(Link)`
    margin-top: 2rem;
    padding: 1rem;
    background-color: #75ab00;
    width: 100%;
    color: #fff;
    display: block;
    text-decoration: none;
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
`;

export const ContenidoDinamico = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    width: 95%;

    @media(min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 5rem;
    }
`;

export const ContenidoPagina = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    width: 95%;

    @media(min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 5rem;
    }
`;

export const Sidebar = styled.aside`
    .precio {
        font-size: 2rem;
        color: #75ab00;
    }
    .agente {
        margin-top: 4rem;
        border-radius: 2rem;
        background-color: #75ab00;
        padding: 3rem;
        color: #FFF;

        p {
            margin: 0;
        }
    }
`;

export const Formulario = styled.form`
    width: 100%;
    display: flex;
    border: 1px solid #e1e1e1;
    max-width: 1200px;
    margin: 2rem auto 0 auto;
`;

export const Select = styled.select`
    flex: 1;
    padding: 1rem;
    appearance: none;
    border: none;
    font-family: 'Lato', sans-serif;
`;