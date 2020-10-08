// Rutas para crear usuarios

import express from 'express';
import { check } from 'express-validator';
import { crearUsuario } from '../controllers/usuario.controller';

const router = express.Router();

// Crea un usuario
// api/usuarios
router.post('/', 
    [
        check('nombre','nombre es obligatorio').not().isEmpty(),
        check('email','email es obligatorio').isEmail(),
        check('password','password es obligatorio y minimo de 6 caracteres').isLength({ min: 6 })
    ], 
    crearUsuario
);

export = router;