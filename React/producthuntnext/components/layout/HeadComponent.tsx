import Head from 'next/head';
import React from 'react';

const HeadComponent = ()  => (
    <Head>
        <html lang="es"/>
        <title>Product Hunt Firebase y Next.js</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> 
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/static/css/app.css"/>
    </Head>
);

export default HeadComponent;