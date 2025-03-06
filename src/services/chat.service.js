import ChatRepository from '../repositories/chat.repository.js';

class ChatService {
    async getUserChats(id_user) {
        return ChatRepository.getUserChats(id_user); 
    }
    
    async updateChat(id_chat, status_chat) {
        return ChatRepository.updateChat(id_chat, status_chat);
    }
}

export default new ChatService();