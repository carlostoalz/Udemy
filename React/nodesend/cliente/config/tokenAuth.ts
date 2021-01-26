import clienteAxios from './axios';

const tokenAuth = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem('token') : '';
    
    if (token) {
        clienteAxios.defaults.headers = {
            Authorization: `Bearer ${ token }`
        }
    }
    else {
        delete clienteAxios.defaults.headers.Authorization;
    }
};

export default tokenAuth;