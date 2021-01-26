import { Request, Response } from 'express';
import { generate } from 'shortid';
import { genSalt, hash } from 'bcryptjs';
import { handleError } from '../common/HandleError';
import Enlace from '../models/enlace.model';
import { RSV } from '../types/Resultado';
import { IEnlace } from '../interfaces/IEnlace';
import { IUsuario } from '../interfaces/IUsuario';
import { validarRequest } from '../common/Validar';
import { IPasswordResponse } from '../interfaces/IPasswordResponse';

let statusCode: number = 0;

// Crear enlace
export const nuevoEnlace = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<string> = new RSV<string>();

    try {
        
        // Revisar si hay errores
        validarRequest(req);

        // Crear un objeto de Enlace
        const { nombre_original, nombre } = <IEnlace>req.body;
        const enlace = new Enlace();
        (<IEnlace><any>enlace).url = generate();
        (<IEnlace><any>enlace).nombre = nombre;
        (<IEnlace><any>enlace).nombre_original = nombre_original;
        
        // Si el usuario está autenticado
        if( (<any>req).usuario ) {
            const { descargas, password } = <IEnlace>req.body;

            // Asignar a enlace el número de descargas
            if (descargas) (<IEnlace><any>enlace).descargas = descargas;
            if (password) {
                const salt = await genSalt(10);
                (<IEnlace><any>enlace).password = await hash(password, salt);
            }

            // Asignar el autor
            (<IEnlace><any>enlace).autor = (<IUsuario>(<any>req).usuario).id;
        }

        // Almacenar en la BD
        await enlace.save();

        infoResultado.datos = `${ (<IEnlace><any>enlace).url }`;
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

// Obtener el enlace
export const obtenerEnlace = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<IPasswordResponse> = new RSV<IPasswordResponse>();

    try {
        const enlace = await Enlace.findOne({ url: req.params.url });
        
        if (!enlace) {
            statusCode = 404;
            throw 'Ese enlace no existe';
        }

        // Si el enlace existe
        infoResultado.datos = {
            nombre: (<IEnlace>enlace).nombre,
            password: false,
            url: ''
        };
        infoResultado.exitoso = true;
        infoResultado.status = 200;
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }
    
    return res.status(infoResultado.status).json(infoResultado);
};

// Obtener Todos los enlaces
export const obtenerEnlaces = async (req: Request, res: Response) => {
    let infoResultado: RSV<IEnlace[]> = new RSV<IEnlace[]>();

    try {
        const enlaces = await Enlace.find().select('url');
        infoResultado.datos = enlaces;
        infoResultado.exitoso = true;
        infoResultado.status = 200;
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).json(infoResultado);
};