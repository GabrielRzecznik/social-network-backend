import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import publicationRoutes from "./routes/publication.routes.js";
import followRoutes from "./routes/follow.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

app.use("/api/user", userRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});