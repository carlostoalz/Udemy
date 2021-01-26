import { Router } from 'express';
import { check } from "express-validator";
import { validarToken } from '../middlewares/auth.middelware';
import { nuevoEnlace, obtenerEnlace, obtenerEnlaces } from '../controllers/enlaces.controller';
import { tienePassword, verificarPassword } from '../middlewares/enlace.middleware';

const router = Router();

router.post(
    '/',
    [
        check('nombre', 'Subé un archivo').not().isEmpty(),
        check('nombre_original', 'Subé un archivo').not().isEmpty()
    ],
    validarToken,
    nuevoEnlace
);

router.get('/',obtenerEnlaces)

router.get(
    '/:url',
    tienePassword,
    obtenerEnlace
);

router.post(
    '/:url',
    verificarPassword,
    obtenerEnlace
);

export default router;