import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

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

// Obtener mensajes de un chat
export const getChat = async (req, res) => {
  const { id_chat } = req.params;
  try {
    const messages = await Message.getChatMessages({ id_chat });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

