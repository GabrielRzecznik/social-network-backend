import pool from '../config/db.js';
import Post from '../classes/post.class.js';

class PostModel {
  // Crear post
  async createPost({ id_user, content, img }) {
    const query = `
      INSERT INTO "post" (id_user, content, img)
      VALUES ($1, $2, $3)
      RETURNING id_post, id_user, content, img AS post_img, status;
    `;
    const result = await pool.query(query, [id_user, content, img]);
    return new Post(result.rows[0]);
  }

  // Obtener post por ID
  async getPostById(id_post) {
    const query = `SELECT * FROM "post" WHERE id_post = $1`;
    const result = await pool.query(query, [id_post]);
    return result.rows[0] ? new Post(result.rows[0]) : null;
  }

  // Actualizar post
  async updatePost(id_post, { content, img }) {
    const query = `
      UPDATE "post"
      SET content = $1, img = $2
      WHERE id_post = $3
      RETURNING id_post, content, img AS post_img, status;
    `;
    const result = await pool.query(query, [content, img, id_post]);
    return new Post(result.rows[0]);
  }

  // Actualizar status post
  async updateStatusPost(id_post, status) {
    const query = `
      UPDATE "post"
      SET status = $2
      WHERE id_post = $1
      RETURNING id_post, content, img AS post_img, status;
    `;
    const result = await pool.query(query, [id_post, status]);
    return new Post(result.rows[0]);
  }

  async getPostsByUser(id_user) {
    const query = `
      SELECT p.id_post, p.id_user, p.content, p.img AS post_img, p.status, p.timestamp, u.name, u.surname, u.username, u.img AS user_img
      FROM post p
      JOIN "user" u ON p.id_user = u.id_user
      WHERE p.id_user = $1
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows;
  }

  async getFeedPosts(id_user) {
    const query = `
      SELECT p.id_post, p.id_user, p.content, p.img AS post_img, p.status, p.timestamp, u.name, u.surname, u.username, u.img AS user_img
      FROM post p
      JOIN follow f ON p.id_user = f.following
      JOIN "user" u ON p.id_user = u.id_user
      WHERE f.follower = $1 AND p.status <> 0;
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows;
  }
}

export default new PostModel();