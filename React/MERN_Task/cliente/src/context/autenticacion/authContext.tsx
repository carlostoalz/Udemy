import { createContext } from 'react';
import { IAuthContext } from '../../interfaces/IAuthContext';

const authContext = createContext<IAuthContext | null>(null);

export default authContext;