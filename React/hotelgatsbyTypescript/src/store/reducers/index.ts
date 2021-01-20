import { combineReducers } from 'redux';
import imagenReducer from './imagen.reducer';
import paginaReducer from "./pagina.reducer";
import habitacionReducer from './habitacion.reducer';
import seoReduder from './seo.reducer';

export default combineReducers({
    imagenes: imagenReducer,
    paginas: paginaReducer,
    habitaciones: habitacionReducer,
    SEO: seoReduder
});