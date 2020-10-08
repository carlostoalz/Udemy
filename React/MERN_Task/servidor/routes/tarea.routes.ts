import express from 'express';
import { validarToken } from '../middlewares/auth.middleware';
import { check } from 'express-validator';
import { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } from '../controllers/tarea.controller';

const router = express.Router();

// api/tareas
// Crear una tarea
router.post(
    '/',
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty(),
    ],
    validarToken,
    crearTarea
);

// Obtener las tareas por proyecto
router.get(
    '/',
    validarToken,
    obtenerTareas
);

// Actualizar tarea
router.put(
    '/:id',
    validarToken,
    actualizarTarea
);

router.delete(
    '/:id',
    validarToken,
    eliminarTarea
);

export = router;