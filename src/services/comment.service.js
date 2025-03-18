import CommentRepository from '../repositories/comment.repository.js';
import postService from './post.service.js';
import CustomError from '../utils/customError.util.js';
import { getCurrentTimestamp } from '../utils/timesStamp.util.js';

class CommentService {
    // Enviar comentario
    async sendComment(
        id_post, 
        id_user, 
        content 
    ) {
        const status = 1;
        const timestamp = getCurrentTimestamp();
        
        // Verificar existencia post
        await postService.findChatByUsers(id_post);

        return CommentRepository.sendComment(
            id_post, 
            id_user, 
            content,
            timestamp,
            status
        );
    }
    
    // Actualizar contenido comentario
    async updateContentComment(id_comment, content) {
        const comment = await this.getCommentById(id_comment);
        if (comment.content === content) throw new CustomError('Comentario sin cambios', 400);

        return CommentRepository.updateContentComment(id_comment, content);
    }

    // Actualizar status comentario
    async updateStatusComment(id_comment, status) {
        const comment = await this.getCommentById(id_comment);
        if (comment.status === status) throw new CustomError('Estado comentario sin cambios', 400);

        return CommentRepository.updateStatusComment(id_comment, status);
    }

    // Obtener comentario por id
    async getCommentById(id_comment) {
        const comment = await CommentRepository.getCommentById(id_comment);
        if (!comment) throw new CustomError('Comentario no encontrado', 404);
        
        return comment;
    }
}

export default new CommentService();