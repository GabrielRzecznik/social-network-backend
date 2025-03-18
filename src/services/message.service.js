import ChatRepository from '../repositories/chat.repository.js';
import MessageRepository from '../repositories/message.repository.js';
import CustomError from '../utils/customError.util.js';
import { getCurrentTimestamp } from '../utils/timesStamp.util.js';

class MessageService {
    // Enviar mensaje
    async sendMessage(
        sender, 
        receiver, 
        content 
    ) {
        const status = 1;
        const timestamp = getCurrentTimestamp();
        
        // Verificar existencia chat entre usuarios
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
    
    // Actualizar contenido mensaje
    async updateContentMessage(id_message, content) {
        const message = await this.getMessageById(id_message);
        if (message.content === content) throw new CustomError('Mensaje sin cambios', 400);

        return MessageRepository.updateContentMessage(id_message, content);
    }

    // Actualizar status mensaje
    async updateStatusMessage(id_message, status) {
        const message = await this.getMessageById(id_message);
        if (message.status === status) throw new CustomError('Estado mensaje sin cambios', 400);

        return MessageRepository.updateStatusMessage(id_message, status);
    }

    // Obtener mensajes chat
    async getChatMessages(id_user, id_chat) {
        return MessageRepository.getChatMessages(id_user, id_chat);
    }

    // Obtener mensaje por id
    async getMessageById(id_message) {
        const message = await MessageRepository.getMessageById(id_message);
        if (!message) throw new CustomError('Mensaje no encontrado', 404);
        
        return message;
    }
}

export default new MessageService();