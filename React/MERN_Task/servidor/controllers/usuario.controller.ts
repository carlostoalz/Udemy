import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { RSV } from '../types/Resultado';
import { IUsuario } from '../interfaces/IUsuario';
import { handleError } from '../common/HandleError';
import Usuario from "../models/Usuario";

let statusCode: number = 0;

export const crearUsuario = async (req: Request, res: Response) => {

    let infoResultado: RSV<null> = new RSV<null>();
    
    try {
        // Revisar si hayy errores
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            statusCode = 400;
            throw errors.array();
        }
        
        const { email, password } = <IUsuario>req.body;
        
        // Revisar que el usuario no exista previamente
        let usuario: Document = await Usuario.findOne({ email });

        if (usuario) {
            statusCode = 401;
            throw new Error('El usuario ya existe');
        }

        // Crea el nuevo Usuario
        usuario = new Usuario(req.body);

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

        // Hashear el password
        const salt = await genSalt(10);
        (<any>usuario).password = await hash(password, salt);

        // Guardar Usuario
        await usuario.save();

        // Mensaje de confirmación
        infoResultado.exitoso = true;
        infoResultado.status = 201;
        infoResultado.mensajeUsuario = 'Usuario creado';

    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);
};