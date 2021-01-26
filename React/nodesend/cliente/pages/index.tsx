import React from 'react';
import Layout from '../components/Layout';
import ProviderApp from '../store/providers/ProviderApp';
import Index from '../components/Index';

const IndexPage = () => (
  <ProviderApp>
    <Layout>
      <Index />
    </Layout>
  </ProviderApp>
)

export default IndexPage
