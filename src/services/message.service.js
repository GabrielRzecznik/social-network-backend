import ChatRepository from '../repositories/chat.repository.js';
import MessageRepository from '../repositories/message.repository.js';

class MessageService {
    async sendMessage(
        sender_message, 
        receiver_message, 
        content_message, 
        timestamp_message, 
        status_message
    ) {
        // Verificar si el chat ya existe entre los dos usuarios
        let chat = await ChatRepository.findChatByUsers(sender_message, receiver_message);
        if (!chat) {
            chat = await ChatRepository.createChat(sender_message, receiver_message);
        }

        return MessageRepository.sendMessage({
            sender_message, 
            receiver_message, 
            content_message, 
            timestamp_message, 
            status_message,
            id_chat: chat.id_chat
        });
    }
    
    async updateContentMessage(id_message, content_message) {
        return MessageRepository.updateContentMessage(id_message, content_message);
    }

    async updateStatusMessage(id_message, status_message) {
        return MessageRepository.updateStatusMessage(id_message, status_message);
    }

    async getChatMessages(id_chat) {
        return MessageRepository.getChatMessages(id_chat);
    }
}

export default new MessageService();