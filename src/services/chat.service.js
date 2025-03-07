import ChatRepository from '../repositories/chat.repository.js';

class ChatService {
    async getUserChats(id_user) {
        return ChatRepository.getUserChats(id_user); 
    }
    
    async updateChat(id_chat, status_chat) {
        const chat = await ChatRepository.getChat(id_chat);
        if (!chat) throw new Error('Chat no encontrado');
        if (chat.status_chat === status_chat) throw new Error('El estado ya está actualizado');
        
        return ChatRepository.updateChat(id_chat, status_chat);
    }
}

export default new ChatService();