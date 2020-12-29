import React from 'react';
import Header from './Header';
import GlobalStyle from '../../style/GlobalStyle';
import HeadComponent from './HeadComponent';

const Layout = (props: React.PropsWithChildren<any>) => {
    return (
        <>
            <HeadComponent />
            <GlobalStyle />
            <Header />
            <main>
                {props.children}
            </main>
        </>
    );
};

export default Layout;