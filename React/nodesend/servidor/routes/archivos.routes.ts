import { Router } from 'express';
import { validarToken } from '../middlewares/auth.middelware';
import { subirArchivo, descargarArchivo, eliminarArchivo } from '../controllers/archivos.controller';
import { guardarArchivo } from '../middlewares/archivo.middleware';

const router = Router();

router.post(
    '/',
    validarToken,
    guardarArchivo,
    subirArchivo
);

router.get(
    '/:archivo',
    descargarArchivo,
    eliminarArchivo
);

export default router;