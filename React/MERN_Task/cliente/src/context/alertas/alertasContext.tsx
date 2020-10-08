import { createContext } from 'react';
import { IAlertaContext } from '../../interfaces/IAlertaContext';

const alertaContext = createContext<IAlertaContext | null>(null);

export default alertaContext;