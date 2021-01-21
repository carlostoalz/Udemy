import { combineReducers } from 'redux';
import imagenReducer from "./imagen.reducer";
import paginaReducer from './pagina.reducer';
import propiedadesReducer from './propiedad.reducer';

export default combineReducers({
    imagenes: imagenReducer,
    paginas: paginaReducer,
    propiedades: propiedadesReducer
});