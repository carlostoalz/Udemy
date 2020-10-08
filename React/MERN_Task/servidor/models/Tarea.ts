import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export = mongoose.model('Tarea', TareasSchema);