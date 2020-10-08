import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const validateEmail = (email: string) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}; 

const Schema = mongoose.Schema;

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
        validate: [ validateEmail , 'Agrega un email válido.']
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

UsuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

export = mongoose.model('Usuario', UsuarioSchema);