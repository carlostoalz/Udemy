import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { handleError } from '../common/HandleError';
import { IUsuario } from '../interfaces/IUsuario';

export const validarToken = (req: Request, res: Response, next: NextFunction) => {   
    
    try {
        // Leer el token del header
        const authHeader = req.get('Authorization');

        // Revisar si hay token
        if(!authHeader) {
            return next();
        }

        const token = authHeader.replace('Bearer ', '');
        
        // Validar el token
        const usuario = <IUsuario>verify(token, <string>process.env.SECRETA);
        (<any>req).usuario = usuario;
        return next();        
    } catch (error) {
        return next(handleError(error));
    }
};