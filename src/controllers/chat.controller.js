import ChatService from '../services/chat.service.js';
import MessageService from '../services/message.service.js';

export const getUserChats = async (req, res) => {
  const id_user = req.user.id_user;
  try {
    const chats = await ChatService.getUserChats(id_user);
    res.status(200).json({message: 'Publicación creada exitosamente', chats: chats});
  } catch (error) {
    console.error('Error en getUserChats:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getChat = async (req, res) => {
  const { id_chat } = req.params;
  try {
    const messages = await MessageService.getChatMessages(id_chat);
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateChat = async (req, res) => {
  const { id_chat, status } = req.body;

  try {
    const chat = await ChatService.updateChat(id_chat, status);
    res.json({ message: 'Chat actualizado exitosamente', chat: chat });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

