import ChatModel from '../models/chat.model.js';
import CustomError from '../utils/customError.util.js';

class ChatService {
    async getListChats(id_user) {
        return ChatModel.getListChats(id_user); 
    }
    
    async updateChat(id_chat, status) {
        const chat = await this.getChat(id_chat);
        if (chat.status === status) throw new CustomError('Estado chat sin cambios', 400);
        return ChatModel.updateChat(id_chat, status);
    }

    async getChat(id_chat) {
        const chat = await ChatModel.getChat(id_chat);
        if (!chat) throw new CustomError('Chat no encontrado', 404);
        return chat;
    }
}

export default new ChatService();