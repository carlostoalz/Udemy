import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { RSV } from '../types/Resultado';
import { handleError } from '../common/HandleError';

let statusCode: number = 0;

export const validarToken = ( req: Request, res: Response, next: NextFunction ) => {

    let infoResultado: RSV<null> = new RSV<null>();
    
    try {

        // Leer el token del header
        const token = req.header('x-auth-token');
    
        // Revisar si hay token
        if(!token) {
            statusCode = 401;
            throw new Error('No hay token, permiso no válido');
        }    
    
        // Validar el token
        const cifrado = verify(token, process.env.SECRETA);
        (<any>req).usuario = (<any>cifrado).usuario;
        return next();

    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'Hubo un error';
        infoResultado.error = handleError(error);
    }
    
    return res.status(infoResultado.status).send(infoResultado);

};