import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import followRoutes from "./routes/follow.routes.js";
import messageRoutes from "./routes/message.routes.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});