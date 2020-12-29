import app from "firebase/app";
import firebaseConfig from "./config";
import 'firebase/auth';

export class Firebase {
    auth: app.auth.Auth;

    constructor() {
        if (!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
    }

    // Función que registra un usuario
    async registrar(nombre: string, email: string, password: string) : Promise<void> {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password);
        return await nuevoUsuario.user?.updateProfile({
            displayName: nombre
        });
    }
};

const firebase: Firebase = new Firebase();
export default firebase;