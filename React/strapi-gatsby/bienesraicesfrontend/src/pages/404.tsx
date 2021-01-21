import React from "react"
import Layout from "../components/layout"
import store from "../store"
import { Provider } from 'react-redux';

const NotFoundPage = () => (
  <Provider store={store}>
    <Layout>
      Pagina no encontrada
    </Layout>
  </Provider>
)

export default NotFoundPage
