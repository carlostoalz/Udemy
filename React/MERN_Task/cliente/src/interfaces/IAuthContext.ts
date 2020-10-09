import { INuevaCuenta } from './INuevaCuenta';
import { ILogin } from './ILogin';

export interface IAuthContext {
    token: string
    autenticado: any;
    usuario: any;
    mensaje: string;
    cargando: boolean;
    registrarUsuario: (datos: INuevaCuenta) => Promise<void>;
    iniciarSesion: (datos: ILogin) => Promise<void>;
    usuarioAutenticado: () => Promise<void>;
    cerrarSesión: () => void;
}