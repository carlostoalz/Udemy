import { Request, Response } from 'express';
import { genSalt, hash } from 'bcryptjs';
import Usuario from '../models/usuario.model';
import { RSV } from '../types/Resultado';
import { handleError } from '../common/HandleError';
import { IUsuario } from '../interfaces/IUsuario';
import { validarRequest } from '../common/Validar';

let statusCode: number = 0;

export const nuevoUsuario = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<null> = new RSV<null>();

    try {
        // Revisar si hayy errores
        validarRequest(req);

        const { email, password } = <IUsuario>req.body

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            statusCode = 400;
            throw new Error('El usuario ya existe');
        }

        // Crea el nuevo Usuario
        usuario = await new Usuario( req.body );

        // Hashear el password
        const salt = await genSalt(10);
        (<IUsuario>usuario).password = await hash(password, salt);
        
        // Guardar Usuario
        await usuario.save();

        // Mensaje de confirmación
        infoResultado.exitoso = true;
        infoResultado.status = 201;
        infoResultado.mensajeUsuario = 'Usuario Creado';
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).json(infoResultado);
};