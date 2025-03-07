import MessageRepository from '../repositories/message.repository.js';
import ChatService from '../service/chat.service.js';

class MessageService {
    async sendMessage(
        sender_message, 
        receiver_message, 
        content_message, 
        timestamp_message, 
        status_message
    ) {
        // Verificar si el chat ya existe entre los dos usuarios
        let chat = await ChatService.findChatByUsers(sender_message, receiver_message);
        if (!chat) {
            chat = await ChatService.createChat(sender_message, receiver_message);
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
    
    async updateMessage(id_message, content_message) {
        return MessageRepository.updateMessage(id_message, content_message);
    }
}

export default new MessageService();