import styled from '@emotion/styled';

export const HeaderStyle = styled.header`
    border-bottom: 2px solid var(--gris3);
    padding: 1rem 0;
`;

export const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

export const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto', serif;
    margin-right: 2rem;
`;

export const Boton = styled.button`
    font-weight: 700;
    text-decoration: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin-right: 1rem;
    background-color: ${(props: any) => props.bgColor ? '#da552f' : 'white'};
    color: ${(props: any) => props.bgColor ? 'white' : '#000'};

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
    }
`;

export const Flex = styled.div`
    display: flex;
    align-items: center;
`;

export const PMarginRight = styled.p`
    margin-right: 2rem;
`;

export const DivLogo = styled.div`
    display: flex;
    align-items: center;
`;

export const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;

export const ButtonSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white; 
    border: none;
    text-indent: --9999px;

    &:hover {
        cursor: pointer;
    }
`;

export const FormBuscar = styled.form`
    position: relative;
`;

export const Nav = styled.nav`
    padding-left: 2rem;

    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;

        &:last-of-type {
            margin-right: 0;
        }
    }
`;

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%auto;
    margin: 5rem auto 0 auto;
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;

    }

    input {
        flex: 1;
        padding: 1rem;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`;

export const TituloCrearCuenta = styled.h1`
    text-align: center;
    margin-top: 5rem;
`;

export const CampoError = styled.p`
    background-color: red;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #FFF;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;