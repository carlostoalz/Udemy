import express from 'express';
import { check } from 'express-validator';
import { nuevoUsuario } from '../controllers/usuario.controller';

const router = express.Router();

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 })
    ],
    nuevoUsuario
);

export default router;