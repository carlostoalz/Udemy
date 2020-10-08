"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const proyecto_routes_1 = __importDefault(require("./routes/proyecto.routes"));
const tarea_routes_1 = __importDefault(require("./routes/tarea.routes"));
// Crear el servidor
const app = express_1.default();
// Conectar a la base de datos
db_1.conectarDB();
// Habilitar express.json
app.use(express_1.default.json());
// Puerto de la app
const PORT = process.env.PORT || 4000;
// Importar Rutas
// app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/usuarios', usuario_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/proyectos', proyecto_routes_1.default);
app.use('/api/tareas', tarea_routes_1.default);
// Arrancar la app
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
//# sourceMappingURL=index.js.map