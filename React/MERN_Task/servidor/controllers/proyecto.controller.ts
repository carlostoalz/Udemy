import { Request, Response } from 'express';
import { handleError } from '../common/HandleError';
import { RSV } from '../types/Resultado';
import Proyecto from '../models/Proyecto';
import { Document } from 'mongoose';
import { IProyecto } from '../interfaces/IProyecto';
import { validationResult } from 'express-validator';

let statusCode: number = 0;

export const crearProyecto = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<Document> = new RSV<Document>();

    try {
        // Revisar si hayy errores
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw errors.array();
        }

        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // Guardar el creador via JWT
        (<IProyecto>(<any>proyecto)).creador = (<any>req).usuario.id;

        // Guardar el proyecto
        infoResultado.datos = await proyecto.save();
        infoResultado.exitoso = true;
        infoResultado.status = 201;
        infoResultado.mensajeUsuario = 'Proyecto creado';
        
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);

};

// Obtiene todos los proyectos del usuario actual
export const obtenerProyectos = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<Document[]> = new RSV<Document[]>();

    try {

        infoResultado.datos = await Proyecto.find({ creador: (<any>req).usuario.id }).sort({ creado: -1 });
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

// Actualizar proyecto por id
export const actualizarProyecto = async (req: Request, res: Response) => {

    let infoResultado: RSV<Document> = new RSV<Document>();

    try {

        // Revisar si hayy errores
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw errors.array();
        }

        // extraer la información del proyecto
        const { nombre } = req.body;
        const nuevoProyecto: any = {};

        if (nombre) {
            nuevoProyecto.nombre = nombre;
        }

        // Revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // Si el proyecto existe o no
        if (!proyecto) {
            statusCode = 404;
            throw new Error('Proyecto no encontrado');
        }

        // Verificar el creador del proyecto
        if ((<IProyecto>(<any>proyecto)).creador.toString() !== (<any>req).usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }

        // Actualizar
        infoResultado.datos = await Proyecto.findByIdAndUpdate({ _id: (<any>req).params.id }, { $set: nuevoProyecto }, { new: true });
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

//Eliminar proyecto por id
export const eliminarProyecto = async (req: Request, res: Response) => {

    let infoResultado: RSV<null> = new RSV<null>();

    try {
        
        // Revisar el id
        let proyecto = await Proyecto.findById(req.params.id);

        // Si el proyecto existe o no
        if (!proyecto) {
            statusCode = 404;
            throw new Error('Proyecto no encontrado');
        }

        // Verificar el creador del proyecto
        if ((<IProyecto>(<any>proyecto)).creador.toString() !== (<any>req).usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }

        await Proyecto.findOneAndRemove({ _id: req.params.id });
        infoResultado.exitoso = true;
        infoResultado.status = 200;
        infoResultado.mensajeUsuario = 'Proyecto eliminado correctamente';

    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);

}