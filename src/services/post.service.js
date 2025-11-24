import PostModel from '../models/post.model.js';
import CustomError from '../utils/customError.util.js';

class PostService {
    async createPost(id_user, content, img) {
        return PostModel.createPost({ id_user, content, img });
    }

    async updatePost(id_post, content, img) {
        const post = await this.getPostById(id_post);
        if (
            post.content === content &&
            post.img === img
        ) {
            throw new CustomError('Post sin cambios', 400);
        }

        return PostModel.updatePost(id_post, {
            content, img
        });
    }

    async updateStatusPost(id_post, status) {
        const post = await this.getPostById(id_post);
        if (post.status === status) throw new CustomError('Estado post sin cambios', 400);

        return PostModel.updateStatusPost(id_post, status);
    }

    async getPostById(id_post) {
        const post = await PostModel.getPostById(id_post);
        if (!post) throw new CustomError('Post no encontrado', 404);
        return post;
    }

    async getPostsByUser(id_user) {
        const posts = await PostModel.getPostsByUser(id_user);
        if (!posts) throw new CustomError('Posts no encontrados', 404);
        return posts;
    }

    async getFeedPosts(id_user) {
        const posts = await PostModel.getFeedPosts(id_user);
        if (!posts) throw new CustomError('Feed posts no encontrados', 404);
        return posts;
    }
}

export default new PostService();