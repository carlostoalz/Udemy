import React, { FC } from 'react';
import Layout from '../components/Layout';
import Login from '../components/Login';
import ProviderApp from '../store/providers/ProviderApp';

const LoginPage: FC = () => {
    return (
        <ProviderApp>
            <Layout>
                <Login />
            </Layout>
        </ProviderApp>
    );
};

export default LoginPage;