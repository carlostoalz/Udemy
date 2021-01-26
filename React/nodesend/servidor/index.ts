import express, { json } from 'express';
import cors from 'cors';
import config from './config.json'
import { conectarDB } from './config/db';
import usuariosRoutes from './routes/usuarios.routes';
import authRoutes from './routes/auth.routes';
import enlacesRoutes from './routes/enlaces.routes';
import archivosRoutes from './routes/archivos.routes';

const app = express();

// Conectar base de datos
conectarDB();

// Habilitar Cors
app.use( cors({
  origin: process.env.FRONTEND_URL      
}));

// Puerto de la app
const port = Number(process.env.PORT || config.PORT || 4000);

// Habilitar leer los valores de un body
app.use( json() );

// Habilitar carpeta pública
app.use( express.static('uploads') );

// Rutas de la app
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/enlaces', enlacesRoutes);
app.use('/api/archivos', archivosRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está funcionando en el puerto ${ port }`);
});