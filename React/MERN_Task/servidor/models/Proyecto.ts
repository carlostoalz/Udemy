import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

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

ProyectoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

export = mongoose.model('Proyecto', ProyectoSchema);