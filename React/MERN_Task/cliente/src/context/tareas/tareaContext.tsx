import { createContext } from 'react';
import { ITareaContext } from '../../interfaces/ITareaContext';

const TareaContext = createContext<ITareaContext | null>(null);

export default TareaContext;