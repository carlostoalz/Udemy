"use strict";
// Rutas para crear usuarios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const usuario_controller_1 = require("../controllers/usuario.controller");
const router = express_1.default.Router();
// Crea un usuario
// api/usuarios
router.post('/', [
    express_validator_1.check('nombre', 'nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'email es obligatorio').isEmail(),
    express_validator_1.check('password', 'password es obligatorio y minimo de 6 caracteres').isLength({ min: 6 })
], usuario_controller_1.crearUsuario);
module.exports = router;
//# sourceMappingURL=usuarios.routes.js.map