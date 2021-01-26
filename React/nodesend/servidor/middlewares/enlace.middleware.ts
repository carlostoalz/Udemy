import { NextFunction, Response, Request } from 'express';
import Enlace from '../models/enlace.model';
import { IEnlace } from '../interfaces/IEnlace';
import { IPasswordResponse } from '../interfaces/IPasswordResponse';
import { RSV } from '../types/Resultado';
import { compareSync } from 'bcryptjs';

export const tienePassword = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const enlace = await Enlace.findOne({ url: req.params.url });
        
        if (!enlace) {
            throw 'Ese enlace no existe';
        }

        if ((<IEnlace>enlace).password) {
            let infoResultado: RSV<IPasswordResponse> = new RSV<IPasswordResponse>();
            infoResultado.datos = {
                password: true,
                url: (<IEnlace>enlace).url
            }
            infoResultado.exitoso = true;
            infoResultado.status = 200;
            return res.status(infoResultado.status).json(infoResultado);
        }
        
        next();
    } catch (error) {
        return next(error);
    }

};

// Verifica la contraseña del archivo
export const verificarPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { url } = req.params;
        const { password } = req.body;

        const enlace = await Enlace.findOne({ url });

        // Verificar el password
        if( compareSync(password, <string>(<IEnlace>enlace).password) ) {
            // permitirle al usuario descargar el archivo
            next();
        } else {
            throw 'Password Incorrecto';
        }
    } catch (error) {
        return next(error);
    }
};