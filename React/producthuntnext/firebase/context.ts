import { createContext } from 'react';
import { IFirebaseContext } from '../interfaces/IFirebaseContext';

const FirebaseContext = createContext<IFirebaseContext>({} as any);

export default FirebaseContext;