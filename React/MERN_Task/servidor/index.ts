import express from 'express';
import { conectarDB } from './config/db';
import usuariosRoutes from './routes/usuario.routes';
import authRoutes from './routes/auth.routes';
import proyectosRoutes from './routes/proyecto.routes';
import tareasRoutes from './routes/tarea.routes';
import cors from 'cors';

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar cors
app.use(cors())

// Habilitar express.json
app.use(express.json())

// Puerto de la app
const PORT = process.env.PORT || 4000; 

// Importar Rutas
// app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/tareas', tareasRoutes);

// Arrancar la app
app.listen(PORT, () => {

    console.log(`El servidor esta funcionando en el puerto ${PORT}`);

});
