import React, { FC } from "react"
import Layout from "../components/layout"
import ImagenHotel from '../components/imagenHotel';
import ContenidoInicio from '../components/contenidoInicio';
import Habitaciones from "../components/habitaciones";
import { Provider } from "react-redux";
import store from "../store";

const IndexPage: FC = () => {

  return (
    <Provider store={store}>
      <Layout>
        <ImagenHotel />
        <ContenidoInicio />
        <Habitaciones />
      </Layout>
    </Provider>
  );
};

export default IndexPage
