import React from "react";
import { Provider } from "react-redux";
import Layout from '../components/layout';
import store from '../store';
import ContenidoInicio from '../components/contenidoInicio';

const IndexPage = () => {
  
  return (
    <Provider store={store}>
      <Layout>
        <ContenidoInicio />
      </Layout>
    </Provider>
  );
};

export default IndexPage;
