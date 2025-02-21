import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();

app.use(express.json()); // Middleware para JSON
app.use('/api/users', userRoutes); // Rutas de usuarios

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});