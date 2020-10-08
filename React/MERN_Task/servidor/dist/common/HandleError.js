"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const Error_1 = require("../types/Error");
exports.handleError = (error) => {
    let wError = new Error_1.Error();
    if (!error) {
        return wError;
    }
    if (error) {
        if (error.message) {
            wError.mensaje = error.message;
        }
        if (error.stack) {
            wError.pila = error.stack;
        }
        if (wError.mensaje && wError.mensaje.trim() !== "") {
            return wError;
        }
    }
    if (Array.isArray(error) && error.length > 0) {
        wError.mensaje = error.map((ve) => ve.msg).join(', ');
        if (wError.mensaje && wError.mensaje.trim() !== "") {
            return wError;
        }
    }
    if (error.trim() !== "") {
        wError.mensaje = error.trim();
        return wError;
    }
};
//# sourceMappingURL=HandleError.js.map