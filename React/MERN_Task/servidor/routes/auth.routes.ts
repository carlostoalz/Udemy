// Rutas para autenticar usuarios usuarios

import express from 'express';
import { check } from 'express-validator';
import { validarToken } from '../middlewares/auth.middleware';
import { autenticarUsuario, usuarioAutenticado } from '../controllers/auth.controller';

const router = express.Router();

// Crea un usuario
// api/auth
router.post('/', 
    [
        check('email','email es obligatorio').isEmail(),
        check('password','password es obligatorio y minimo de 6 caracteres').isLength({ min: 6 })
    ], 
    autenticarUsuario
);

// Obtiene el usuario autenticado
router.get(
    '/',
    validarToken,
    usuarioAutenticado
);

export = router;