import { combineReducers } from "redux";
import usuarioReducer from './usuario.reducer';
import archivoReducer from './archivo.reducer';
import alertaReducer from './alerta.reducer';
import enlaceReducer from './enlace.reducer';

export default combineReducers({
    usuarioState: usuarioReducer,
    archivoState: archivoReducer,
    alertaState: alertaReducer,
    enlaceState: enlaceReducer
});

