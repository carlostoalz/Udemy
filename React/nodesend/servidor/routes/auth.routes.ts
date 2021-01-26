import { check } from "express-validator";
import { Router } from 'express';
import { autenticarUsuario, usuarioAutenticado } from '../controllers/auth.controller';
import { validarToken } from '../middlewares/auth.middelware';

const router = Router();

router.post(
    '/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 })
    ],
    autenticarUsuario
);

router.get(
    '/',
    validarToken,
    usuarioAutenticado
);

export default router;