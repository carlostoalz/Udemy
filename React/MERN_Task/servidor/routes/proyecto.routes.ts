import express from 'express';
import { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } from '../controllers/proyecto.controller'
import { validarToken } from '../middlewares/auth.middleware';
import { check } from 'express-validator';

const router = express.Router();

// Crea un proyecto
// api/proyectos
router.post(
    '/', 
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    validarToken, 
    crearProyecto
);

// Obtener los proyectos de un usuario
router.get('/', validarToken, obtenerProyectos);

// Actualizar proyecto via ID
router.put(
    '/:id', 
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    validarToken, 
    actualizarProyecto
);

//Eliminar proyecto por id
router.delete(
    '/:id',
    validarToken,
    eliminarProyecto
);

export = router;