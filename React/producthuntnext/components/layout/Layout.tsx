import React, { Props } from 'react';

const Layout = (props: Props<any>) => {
    return (
        <>
            <h1>Header</h1>
            <main>
                {props.children}
            </main>
        </>
    );
};

export default Layout;