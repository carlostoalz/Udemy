import { INuevaCuenta } from './INuevaCuenta';
import { ILogin } from './ILogin';

export interface IAuthContext {
    token: string
    autenticado: any;
    usuario: any;
    mensaje: string;
    registrarUsuario: (datos: INuevaCuenta) => Promise<void>;
    iniciarSesion: (datos: ILogin) => Promise<void>;
}