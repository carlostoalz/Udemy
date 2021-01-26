import { Schema, Document, model } from "mongoose";
import { IUsuario } from '../interfaces/IUsuario';

interface UsuarioModel extends Document<IUsuario> {}

const usuarioSchema: Schema<UsuarioModel> = new Schema<UsuarioModel>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }   
});

export default model<UsuarioModel>('Usuarios', usuarioSchema);