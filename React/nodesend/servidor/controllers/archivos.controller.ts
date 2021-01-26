import { Request, Response, NextFunction } from 'express';
import { unlinkSync } from 'fs';
import { RSV } from '../types/Resultado';
import { handleError } from '../common/HandleError';
import Enlace from '../models/enlace.model';
import { IEnlace } from '../interfaces/IEnlace';


let statusCode: number = 0;

export const subirArchivo = async (req: Request, res: Response) => {
    let infoResultado: RSV<string> = new RSV<string>();
    
    try {      
        infoResultado.datos = req.file.filename;
        infoResultado.exitoso = true;
        infoResultado.status = 201
    } catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = handleError(error);
    }

    return res.status(infoResultado.status).json(infoResultado);
};

export const descargarArchivo = (req: Request, res: Response, next: NextFunction) => {
    (<any>req).archivo = req.params.archivo;
    const archivo = `${ __dirname }/../uploads/${ req.params.archivo }`
    res.download(archivo);
    next();
};

export const eliminarArchivo = async (req: Request) => {
    try {
        console.log((<any>req).archivo);
        const enlace = await Enlace.findOne({ nombre: (<any>req).archivo });
        
        if (!enlace) {
            statusCode = 404;
            throw 'Ese enlace no existe';
        }
        
        // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
        if ((<IEnlace>enlace).descargas === 1) {
            // Eliminar el archivo
            unlinkSync(`${ __dirname }/../uploads/${ (<any>req).archivo }`);
            console.log(`Archivo ${ (<any>req).archivo } Eliminado`);

            // Eliminar la entrada de la bd
            await Enlace.findOneAndRemove({ id: (<IEnlace>enlace).id });

        } else {
            // si las descargas son mayores a 1 - Restar 1 descarga
            (<number>(<IEnlace>enlace).descargas)--;
            await enlace.save();
        }
    } catch (error) {
        console.log(error);
    }
};