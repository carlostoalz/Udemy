"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const Schema = mongoose_1.default.Schema;
const ProyectoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del proyecto es obligatorio'],
        trim: true,
        unique: true
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario de creación es obligatorio']
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});
ProyectoSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe de ser único' });
module.exports = mongoose_1.default.model('Proyecto', ProyectoSchema);
//# sourceMappingURL=Proyecto.js.map