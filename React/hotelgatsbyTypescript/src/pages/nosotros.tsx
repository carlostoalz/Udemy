import React, { FC } from 'react';
import Layout from '../components/layout';
import ContenidoNosotros from '../components/contenidoNosotros';
import { Provider } from 'react-redux';
import store from '../store';

const NosotrosPage: FC = () => {
    return (
        <Provider store={store}>
            <Layout>
                <ContenidoNosotros />
            </Layout>
        </Provider>
    );
};

export default NosotrosPage;