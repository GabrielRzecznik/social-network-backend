import ChatRepository from '../repositories/chat.repository.js';

class ChatService {
    async getListChats(id_user) {
        return ChatRepository.getListChats(id_user); 
    }
    
    async updateChat(id_chat, status) {
        const chat = await ChatRepository.getChat(id_chat);
        if (!chat) throw new Error('Chat no encontrado');
        if (chat.status_chat === status) throw new Error('Estado sin cambios');
        
        return ChatRepository.updateChat(id_chat, status);
    }
}

export default new ChatService();