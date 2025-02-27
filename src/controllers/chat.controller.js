import Chat from "../models/chat.model.js";

// Obtener chats de un usuario
export const getUserChats = async (req, res) => {
  const { id_user } = req.body;

  try {
    const chats = await Chat.getUserChats({ id_user });
    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};