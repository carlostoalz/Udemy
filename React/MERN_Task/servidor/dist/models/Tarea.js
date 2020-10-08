"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TareasSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la tarea es obligatorio'],
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: [true, 'El proyecto es obligatorio']
    }
});
module.exports = mongoose_1.default.model('Tarea', TareasSchema);
//# sourceMappingURL=Tarea.js.map