import { Schema, Document, model } from "mongoose";
import { IEnlace } from '../interfaces/IEnlace';

interface EnlaceModel extends Document<IEnlace> {}

const enlaceSchema: Schema<EnlaceModel> = new Schema<EnlaceModel>({
    url: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    nombre_original: {
        type: String,
        required: true
    },
    descargas: {
        type: Number,
        default: 1
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        default: null
    },
    password: {
        type: String,
        default: null
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

export default model<EnlaceModel>('Enlaces', enlaceSchema);