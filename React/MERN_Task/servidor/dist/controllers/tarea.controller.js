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
exports.eliminarTarea = exports.actualizarTarea = exports.obtenerTareas = exports.crearTarea = void 0;
const express_1 = require("express");
const Tarea_1 = __importDefault(require("../models/Tarea"));
const Proyecto_1 = __importDefault(require("../models/Proyecto"));
const Resultado_1 = require("../types/Resultado");
const HandleError_1 = require("../common/HandleError");
const express_validator_1 = require("express-validator");
let statusCode = 0;
// Crea una nueva tarea
exports.crearTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Revisar si hay errores
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            throw errors.array();
        }
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = yield Proyecto_1.default.findById(proyecto);
        if (!existeProyecto) {
            statusCode = 404;
            throw new Error('Proyecto no encontrado');
        }
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }
        // Creamos la tarea
        const tarea = new Tarea_1.default(req.body);
        infoResultado.datos = yield tarea.save();
        infoResultado.exitoso = true;
        infoResultado.mensajeUsuario = 'Tarea creada exitosamente';
        infoResultado.status = 201;
    }
    catch (error) {
        infoResultado.exitoso = false;
        infoResultado.status = statusCode > 0 ? statusCode : 500;
        infoResultado.mensajeUsuario = 'hubo un error';
        infoResultado.error = HandleError_1.handleError(error);
    }
    return res.status(infoResultado.status).send(infoResultado);
});
exports.obtenerTareas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        const existeProyecto = yield Proyecto_1.default.findById(proyecto);
        if (!existeProyecto) {
            statusCode = 404;
            throw new Error('Proyecto no encontrado');
        }
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }
        // Obtener las tareas por proyecto
        infoResultado.datos = yield Tarea_1.default.find({ proyecto });
        infoResultado.exitoso = false;
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
exports.actualizarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;
        // Revisar si la tarea existe o no
        const tarea = yield Tarea_1.default.findById(req.params.id);
        if (!tarea) {
            statusCode = 404;
            throw new Error('Tarea no encontrada');
        }
        // Extraer proyecto
        const existeProyecto = yield Proyecto_1.default.findById(proyecto);
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }
        // Crear un objeto con la nueva información
        const nuevaTarea = {};
        if (nombre)
            nuevaTarea.nombre = nombre;
        if (estado)
            nuevaTarea.estado = estado;
        // Guardar Tarea
        infoResultado.datos = yield Tarea_1.default.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });
        infoResultado.exitoso = true;
        infoResultado.mensajeUsuario = "Tarea Actualizada";
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
exports.eliminarTarea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let infoResultado = new Resultado_1.RSV();
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;
        // Revisar si la tarea existe o no
        const tarea = yield Tarea_1.default.findById(req.params.id);
        if (!tarea) {
            statusCode = 404;
            throw new Error('Tarea no encontrada');
        }
        // Extraer proyecto
        const existeProyecto = yield Proyecto_1.default.findById(proyecto);
        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            statusCode = 401;
            throw new Error('No Autorizado');
        }
        // Eliminar 
        yield Tarea_1.default.findOneAndRemove({ _id: express_1.request.params.id });
        infoResultado.exitoso = true;
        infoResultado.mensajeUsuario = 'Tarea eliminada correctamente';
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
//# sourceMappingURL=tarea.controller.js.map