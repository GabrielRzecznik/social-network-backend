import ChatRepository from '../repositories/chat.repository.js';
import MessageRepository from '../repositories/message.repository.js';

class MessageService {
    async sendMessage(
        sender, 
        receiver, 
        content, 
        timestamp
    ) {
        const status = 1;
        
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
        const message = await this.getMessageById(id_message);
        console.log(message.content === content)
        if (message.content === content) throw new Error('No hay cambios en el mensaje');

        return MessageRepository.updateContentMessage(id_message, content);
    }

    async updateStatusMessage(id_message, status_message) {
        return MessageRepository.updateStatusMessage(id_message, status);
    }

    async getChatMessages(id_chat) {
        return MessageRepository.getChatMessages(id_chat);
    }

    async getMessageById(id_message) {
        const message = await MessageRepository.getMessageById(id_message);
        if (!message) throw new Error('Mensaje no encontrado');
        
        return message;
    }
}

export default new MessageService();