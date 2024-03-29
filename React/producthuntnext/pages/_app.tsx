import firebase, { FirebaseContext } from '../firebase';

const MyApp = (props: React.PropsWithChildren<any>) => {

    const { Component, pageProps } = props;

    return (
        <FirebaseContext.Provider
            value={{
                firebase
            }}
        >
            <Component {...pageProps}/>
        </FirebaseContext.Provider>
    );
};

export default MyApp;