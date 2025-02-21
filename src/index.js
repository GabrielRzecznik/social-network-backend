import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
//import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});