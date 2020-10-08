import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { validationResult } from 'express-validator';
import { RSV } from '../types/Resultado';
import { IUsuario } from '../interfaces/IUsuario';
import { handleError } from '../common/HandleError';
import Usuario from "../models/Usuario";
import { sign } from 'jsonwebtoken';
import { Document } from 'mongoose';

let statusCode: number = 0;

export const autenticarUsuario = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<null> = new RSV<null>();
    
    try {
        
        // Revisar si hayy errores
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            statusCode = 400;
            throw errors.array();
        }

        // Extraer el email y el password
        const { email, password } = req.body;

        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            statusCode = 400;
            throw new Error('El usuario no existe');
        }

        // Revisar password
        const passCorrecto = await compare(password, (<IUsuario>(<any>usuario)).password);
        if(!passCorrecto) {
            statusCode = 400;
            throw new Error('Password incorrecto');
        }

        // Si todo es correcto
        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        
        // Firmar el JWT
        const firmar = new Promise<string>( (resolve, reject) => {
            sign( payload, process.env.SECRETA, {
                expiresIn: 3600
            }, (err, token) => {
                if(err) reject(err);
                resolve(token);
            });
        });

        infoResultado.token = await firmar;

        // Mensaje de confirmación
        infoResultado.exitoso = true;
        infoResultado.status = 200;
        infoResultado.mensajeUsuario = `Bienvenido ${(<IUsuario>(<any>usuario)).nombre}`;

    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);

};

// Obtiene el usuario que esta autenticado
export const usuarioAutenticado = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<Document> = new RSV<Document>();

    try {
        
        infoResultado.datos = await Usuario.findById((<any>req).usuario.id).select('-password');
        infoResultado.exitoso = true;
        infoResultado.status = 200;

    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);

};