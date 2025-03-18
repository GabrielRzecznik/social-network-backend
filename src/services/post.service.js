import PostRepository from '../repositories/post.repository.js';
import CustomError from '../utils/customError.util.js';

class PostService {
    async createPost(id_user, content, img) {
        return PostRepository.createPost({ id_user, content, img });
    }

    async updatePost(id_post, content, img) {
        const post = await PostRepository.getPostById(id_post);
        if (!post) throw new CustomError('Post no encontrado', 404);
        if (
            post.content === content &&
            post.img === img
        ) {
            throw new CustomError('Post sin cambios', 400);
        }

        return PostRepository.updatePost(id_post, {
            content, img
        });
    }

    async updateStatusPost(id_post, status) {
        const post = await PostRepository.getPostById(id_post);
        if (!post) throw new CustomError('Post no encontrado', 404);
        if (post.status === status) throw new CustomError('Estado sin cambios', 400);

        return PostRepository.updateStatusPost(id_post, status);
    }
}

export default new PostService();