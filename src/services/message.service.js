import ChatRepository from '../repositories/chat.repository.js';
import MessageRepository from '../repositories/message.repository.js';

class MessageService {
    async sendMessage(
        sender, 
        receiver, 
        content, 
        timestamp, 
        status
    ) {
        // Verificar si el chat ya existe entre los dos usuarios
        let chat = await ChatRepository.findChatByUsers(sender, receiver);
        if (!chat) {
            chat = await ChatRepository.createChat(sender, receiver);
        }

        return MessageRepository.sendMessage(
            sender, 
            receiver, 
            content, 
            timestamp, 
            status,
            chat.id_chat
        );
    }
    
    async updateContentMessage(id_message, content) {
        return MessageRepository.updateContentMessage(id_message, content);
    }

    async updateStatusMessage(id_message, status_message) {
        return MessageRepository.updateStatusMessage(id_message, status);
    }

    async getChatMessages(id_chat) {
        return MessageRepository.getChatMessages(id_chat);
    }
}

export default new MessageService();