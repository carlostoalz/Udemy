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
exports.eliminarProyecto = exports.actualizarProyecto = exports.obtenerProyectos = exports.crearProyecto = void 0;
const HandleError_1 = require("../common/HandleError");
const Resultado_1 = require("../types/Resultado");
const Proyecto_1 = __importDefault(require("../models/Proyecto"));
const express_validator_1 = require("express-validator");
let statusCode = 0;
exports.crearProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Revisar si hayy errores
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            throw errors.array();
        }
        // Crear un nuevo proyecto
        const proyecto = new Proyecto_1.default(req.body);
        // Guardar el creador via JWT
        proyecto.creador = req.usuario.id;
        // Guardar el proyecto
        infoResultado.datos = yield proyecto.save();
        infoResultado.exitoso = true;
        infoResultado.status = 201;
        infoResultado.mensajeUsuario = 'Proyecto creado';
    }
    catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = HandleError_1.handleError(error);
    }
    return res.status(infoResultado.status).send(infoResultado);
});
// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        infoResultado.datos = yield Proyecto_1.default.find({ creador: req.usuario.id }).sort({ creado: -1 });
        infoResultado.exitoso = true;
        infoResultado.status = 200;
    }
    catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = HandleError_1.handleError(error);
    }
    return res.status(infoResultado.status).send(infoResultado);
});
// Actualizar proyecto por id
exports.actualizarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Revisar si hayy errores
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            throw errors.array();
        }
        // extraer la información del proyecto
        const { nombre } = req.body;
        const nuevoProyecto = {};
        if (nombre) {
            nuevoProyecto.nombre = nombre;
        }
        // Revisar el id
        let proyecto = yield Proyecto_1.default.findById(req.params.id);
        // Si el proyecto existe o no
        if (!proyecto) {
            statusCode = 404;
            throw new Error('Proyecto no encontrado');
        }
        // Verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }
        // Actualizar
        infoResultado.datos = yield Proyecto_1.default.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });
        infoResultado.exitoso = true;
        infoResultado.status = 200;
    }
    catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = HandleError_1.handleError(error);
    }
    return res.status(infoResultado.status).send(infoResultado);
});
//Eliminar proyecto por id
exports.eliminarProyecto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Revisar el id
        let proyecto = yield Proyecto_1.default.findById(req.params.id);
        // Si el proyecto existe o no
        if (!proyecto) {
            statusCode = 404;
            throw new Error('Proyecto no encontrado');
        }
        // Verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }
        yield Proyecto_1.default.findOneAndRemove({ _id: req.params.id });
        infoResultado.exitoso = true;
        infoResultado.status = 200;
        infoResultado.mensajeUsuario = 'Proyecto eliminado correctamente';
    }
    catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = HandleError_1.handleError(error);
    }
    return res.status(infoResultado.status).send(infoResultado);
});
//# sourceMappingURL=proyecto.controller.js.map