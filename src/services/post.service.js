import PostRepository from '../repositories/post.repository.js';

class PostService {
    async createPost(id_user, content, img) {
        return PostRepository.createPost({ id_user, content, img });
    }

    async updatePost(id_post, content, img) {
        const postData = await PostRepository.getPostById(id_post);

        if (
            postData.content === content &&
            postData.img === img
        ) {
            throw new Error('No se realizaron cambios');
        }

        return PostRepository.updatePost(id_post, {
            content, img
        });
    }

    async updateStatusPost(id_post, status) {
        const post = await PostRepository.getPostById(id_post);
        if (!post) throw new Error('Post no encontrado');
        if (post.status === status) throw new Error('El estado ya está actualizado');

        return PostRepository.updateStatusPost(id_post, status);
    }
}

export default new PostService();