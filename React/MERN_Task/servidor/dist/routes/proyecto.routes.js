"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const proyecto_controller_1 = require("../controllers/proyecto.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
// Crea un proyecto
// api/proyectos
router.post('/', [
    express_validator_1.check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], auth_middleware_1.validarToken, proyecto_controller_1.crearProyecto);
// Obtener los proyectos de un usuario
router.get('/', auth_middleware_1.validarToken, proyecto_controller_1.obtenerProyectos);
// Actualizar proyecto via ID
router.put('/:id', [
    express_validator_1.check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], auth_middleware_1.validarToken, proyecto_controller_1.actualizarProyecto);
//Eliminar proyecto por id
router.delete('/:id', auth_middleware_1.validarToken, proyecto_controller_1.eliminarProyecto);
module.exports = router;
//# sourceMappingURL=proyecto.routes.js.map