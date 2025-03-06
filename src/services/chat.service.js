import ChatRepository from '../repositories/chat.repository.js';

class ChatService {
    async getUserChats(id_chat) {
        return ChatRepository.getUserChats({ id_chat });
    }
    
    async updateChat(id_chat, status) {
        return ChatRepository.updateChat({ id_chat, status });
    }
}

export default new ChatService();