import React, { FC } from 'react';
import Layout from '../components/Layout';
import CrearCuenta from '../components/CrearCuenta';
import ProviderApp from '../store/providers/ProviderApp';

const CrearCuentaPage: FC = () => {
    return (
        <ProviderApp>
            <Layout>
                <CrearCuenta />
            </Layout>
        </ProviderApp>
    );
};

export default CrearCuentaPage;