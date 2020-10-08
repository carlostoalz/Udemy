"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const validateEmail = (email) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
const Schema = mongoose_1.default.Schema;
const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Agrega un email válido.'],
        trim: true,
        unique: true,
        validate: [validateEmail, 'Agrega un email válido.']
    },
    password: {
        type: String,
        required: [true, 'El password debe ser minimo de 6 caracteres'],
        trim: true,
        minlength: 6
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});
UsuarioSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe de ser único' });
module.exports = mongoose_1.default.model('Usuario', UsuarioSchema);
//# sourceMappingURL=Usuario.js.map