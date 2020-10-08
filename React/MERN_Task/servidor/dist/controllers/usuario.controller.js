"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuario = void 0;
const bcryptjs_1 = require("bcryptjs");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const Resultado_1 = require("../types/Resultado");
const HandleError_1 = require("../common/HandleError");
const Usuario_1 = __importDefault(require("../models/Usuario"));
exports.crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Revisar si hayy errores
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            throw errors.array();
        }
        const { email, password } = req.body;
        // Revisar que el usuario no exista previamente
        let usuario = yield Usuario_1.default.findOne({ email });
        if (usuario) {
            throw new Error('El usuario ya existe');
        }
        // Crea el nuevo Usuario
        usuario = new Usuario_1.default(req.body);
        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // Firmar el JWT
        const firmar = new Promise((resolve, reject) => {
            jsonwebtoken_1.sign(payload, process.env.SECRETA, {
                expiresIn: 3600
            }, (err, token) => {
                if (err)
                    reject(err);
                resolve(token);
            });
        });
        infoResultado.token = yield firmar;
        // Hashear el password
        const salt = yield bcryptjs_1.genSalt(10);
        usuario.password = yield bcryptjs_1.hash(password, salt);
        // Guardar Usuario
        yield usuario.save();
        // Mensaje de confirmación
        infoResultado.exitoso = true;
        infoResultado.status = 201;
        infoResultado.mensajeUsuario = 'Usuario creado';
    }
    catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = HandleError_1.handleError(error);
    }
    return res.send(infoResultado);
});
//# sourceMappingURL=usuario.controller.js.map