export interface IAuthState {
    token: string | null;
    autenticado: boolean;
    usuario?: any;
    mensaje: string | null;
    cargando: boolean
}