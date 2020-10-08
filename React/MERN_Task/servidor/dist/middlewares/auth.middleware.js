"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const Resultado_1 = require("../types/Resultado");
const HandleError_1 = require("../common/HandleError");
exports.validarToken = (req, res, next) => {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Leer el token del header
        const token = req.header('x-auth-token');
        // Revisar si hay token
        if (!token) {
            throw new Error('No hay token, permiso no válido');
        }
        // Validar el token
        const cifrado = jsonwebtoken_1.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        return next();
    }
    catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = 401;
        infoResultado.mensajeUsuario = 'Hubo un error';
        infoResultado.error = HandleError_1.handleError(error);
    }
    return res.send(infoResultado);
};
//# sourceMappingURL=auth.middleware.js.map