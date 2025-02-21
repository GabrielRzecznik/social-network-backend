import express from "express";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//Endpoint para obtener todos los usuarios
app.get("/users", async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM "user"');
    res.json(response.rows);
  } catch (error) {
    console.log("Error en la consulta:", error);
    res.status(500).json({error: "Error al obtener usuarios"});
  }
});