import ChatRepository from '../repositories/chat.repository.js';
import CustomError from '../utils/customError.util.js';

class ChatService {
    async getListChats(id_user) {
        return ChatRepository.getListChats(id_user); 
    }
    
    async updateChat(id_chat, status) {
        const chat = await this.getChat(id_chat);
        if (chat.status === status) throw new CustomError('Estado sin cambios', 400);
        return ChatRepository.updateChat(id_chat, status);
    }

    async getChat(id_chat) {
        const chat = await ChatRepository.getChat(id_chat);
        if (!chat) throw new CustomError('Chat no encontrado', 404);
        return chat;
    }
}

export default new ChatService();