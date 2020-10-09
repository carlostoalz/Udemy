import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Tarea from '../models/Tarea';
import Proyecto from  '../models/Proyecto';
import { RSV } from '../types/Resultado';
import { handleError } from '../common/HandleError';
import { validationResult } from 'express-validator';
import { IProyecto } from '../interfaces/IProyecto';
import { ITarea } from '../interfaces/ITarea';

let statusCode:number = 0;

// Crea una nueva tarea
export const crearTarea = async (req: Request, res: Response) => {

    let infoResultado: RSV<Document> = new RSV<Document>();

    try {

        // Revisar si hay errores
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw errors.array();
        }

        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            statusCode = 404;
            throw new Error('Proyecto no encontrado');
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if ((<IProyecto>(<any>existeProyecto)).creador.toString() !== (<any>req).usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        infoResultado.datos = await tarea.save();
        infoResultado.exitoso = true;
        infoResultado.mensajeUsuario = 'Tarea creada exitosamente';
        infoResultado.status = 201;
        
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);

};

export const obtenerTareas = async (req: Request, res: Response) => {
    
    let infoResultado: RSV<Document[]> = new RSV<Document[]>();

    try {
        
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;

        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            statusCode = 404;
            throw new Error('Proyecto no encontrado');
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if ((<IProyecto>(<any>existeProyecto)).creador.toString() !== (<any>req).usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }

        // Obtener las tareas por proyecto
        infoResultado.datos = await Tarea.find({ proyecto }).sort({ creado: -1 });
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

export const actualizarTarea = async ( req: Request, res: Response ) => {

    let infoResultado: RSV<Document> = new RSV<Document>();

    try {

        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;
        
        // Revisar si la tarea existe o no
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            statusCode = 404;
            throw new Error('Tarea no encontrada');
        }

        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if ((<IProyecto>(<any>existeProyecto)).creador.toString() !== (<any>req).usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }

        // Crear un objeto con la nueva información
        const nuevaTarea: any = {};
        (<ITarea>nuevaTarea).nombre = nombre;
        (<ITarea>nuevaTarea).estado = estado;

        // Guardar Tarea
        infoResultado.datos = await Tarea.findOneAndUpdate( { _id: req.params.id }, nuevaTarea, { new: true } );
        infoResultado.exitoso = true;
        infoResultado.mensajeUsuario = "Tarea Actualizada";
        infoResultado.status = 200;
        
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);

};

export const eliminarTarea = async ( req: Request, res: Response ) => {
    
    let infoResultado: RSV<null> = new RSV<null>();

    try {

        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.query;
        
        // Revisar si la tarea existe o no
        const tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            statusCode = 404;
            throw new Error('Tarea no encontrada');
        }

        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if ((<IProyecto>(<any>existeProyecto)).creador.toString() !== (<any>req).usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }

        // Eliminar 
        await Tarea.findOneAndRemove( {_id: req.params.id} );

        infoResultado.exitoso = true;
        infoResultado.mensajeUsuario = 'Tarea eliminada correctamente';
        infoResultado.status = 200;
        
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).send(infoResultado);

};