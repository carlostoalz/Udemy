import { NextFunction, Response, Request } from 'express';
import multer, { Options, diskStorage } from 'multer';
import { generate } from 'shortid';
import { RSV } from '../types/Resultado';

export const guardarArchivo = (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const configurationMulter: Options = {
            limits: {
                fileSize: (<any>req).usuario ? Math.pow(1024,3) * 10 : Math.pow(1024,2) * 10
            },
            storage: diskStorage({
                destination: (req, file, cb) => cb(null, `${ __dirname }/../uploads`),
                filename: (req, file, cb) => {
                    // const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                    const extension = file.originalname.substr(file.originalname.lastIndexOf('.'), file.originalname.length);
                    cb(null, `${ generate() }${ extension }`);
                }                
            })
        };
        
        const upload = multer(configurationMulter).single('archivo');
        upload( req, res, async (error: any) => {
            if (error) {
                let infoResultado: RSV<null> = new RSV<null>();
                infoResultado.exitoso = false;
                infoResultado.status = 500,
                infoResultado.mensajeUsuario = 'Hubo un error al subor el archivo';
                infoResultado.error = {
                    mensaje: error.message,
                    pila: error.stack
                };                
                return res.status(infoResultado.status).send(infoResultado);
            }
            return next();
        });
    } catch (error) {        
        return next(error);
    }
};