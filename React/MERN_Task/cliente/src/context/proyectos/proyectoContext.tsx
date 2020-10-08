import { createContext } from 'react';
import { IProyectoContext } from '../../interfaces/IProyectoContext';

const proyectoContext = createContext<IProyectoContext | null>(null);

export default proyectoContext;

