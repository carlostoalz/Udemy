import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import { Document } from 'mongoose';
import { RSV } from '../types/Resultado';
import { handleError } from '../common/HandleError';
import Usuario from '../models/usuario.model';
import { IUsuario } from '../interfaces/IUsuario';
import { validarRequest } from '../common/Validar';

let statusCode: number = 0;

export const autenticarUsuario = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<null> = new RSV<null>();
    
    try {
        
        // Revisar si hay errores
        validarRequest(req);

        // Buscar el usuario para ver si está registrado
        const { email, password } = <IUsuario>req.body;
        const usuario = await Usuario.findOne({ email });
        
        if (!usuario) {
            statusCode = 401;
            throw new Error('El usuario no existe');
        }

        // Verificar el password y autenticar el usuario
        if (!(await compare(password, (<IUsuario>usuario).password))) {
            statusCode = 400;
            throw new Error('Password incorrecto');
        }

        // Si todo es correcto
        // crear y firmar el JWT
        const payload = {
            id: (<IUsuario>usuario).id,
            nombre: (<IUsuario>usuario).nombre,
            email: (<IUsuario>usuario).email
        };

        const token = sign( payload, <string>process.env.SECRETA, {
            expiresIn: '8h'
        });

        infoResultado.token = token;
        infoResultado.status = 201;
        infoResultado.exitoso = true;
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).json(infoResultado);
};

export const usuarioAutenticado = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<Document> = new RSV<Document>();

    try {
        infoResultado.datos = await Usuario.findById((<IUsuario>(<any>req).usuario).id).select('-password');
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