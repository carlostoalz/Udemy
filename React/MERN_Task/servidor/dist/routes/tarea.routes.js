"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const express_validator_1 = require("express-validator");
const tarea_controller_1 = require("../controllers/tarea.controller");
const router = express_1.default.Router();
// api/tareas
// Crear una tarea
router.post('/', [
    express_validator_1.check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
    express_validator_1.check('proyecto', 'El Proyecto es obligatorio').not().isEmpty(),
], auth_middleware_1.validarToken, tarea_controller_1.crearTarea);
// Obtener las tareas por proyecto
router.get('/', auth_middleware_1.validarToken, tarea_controller_1.obtenerTareas);
// Actualizar tarea
router.put('/:id', auth_middleware_1.validarToken, tarea_controller_1.actualizarTarea);
router.delete('/:id', auth_middleware_1.validarToken, tarea_controller_1.eliminarTarea);
module.exports = router;
//# sourceMappingURL=tarea.routes.js.map