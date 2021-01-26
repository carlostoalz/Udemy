import React, { FC } from 'react';
import Enlace from '../../components/Enlace';
import Layout from '../../components/Layout';
import ProviderApp from '../../store/providers/ProviderApp';
import { ObtenerEnlaces, ObtenerEnlace } from '../../services/enlace.service';
import { IPasswordResponse } from '../../interfaces/IPasswordResponse';

type StaticProps = {
    params : {
        enlace: string;
    }
}

export const getServerSideProps = async (props: StaticProps) => {

    const { enlace } = props.params;
    const resultado = await ObtenerEnlace(enlace);
    const { datos } = resultado;
    return {
        props: {
            enlace: datos
        }
    }
};

export const getServerSidePaths = async () => {
    const resultado = await ObtenerEnlaces();
    const { datos } = resultado;
    return {
        paths: datos.map(enlace => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
};

type EnlacePageProps = {
    enlace: string | IPasswordResponse
}

const EnlacePage: FC<EnlacePageProps> = ({ enlace }) => {
    return (
        <ProviderApp>
            <Layout>
                <Enlace 
                    enlace={enlace}
                />
            </Layout>
        </ProviderApp>
    );
};;

export default EnlacePage;