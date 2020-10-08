"use strict";
// Rutas para autenticar usuarios usuarios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
// Crea un usuario
// api/auth
router.post('/', [
    express_validator_1.check('email', 'email es obligatorio').isEmail(),
    express_validator_1.check('password', 'password es obligatorio y minimo de 6 caracteres').isLength({ min: 6 })
], auth_controller_1.autenticarUsuario);
module.exports = router;
//# sourceMappingURL=auth.routes.js.map