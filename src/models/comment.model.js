import pool from '../config/db.js';
import Comment from '../classes/comment.class.js';

class CommentModel {
  async sendComment(id_post, id_user, content, timestamp, status) {
    const query = `
      INSERT INTO "comment" (id_post, id_user, content, timestamp, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_comment, id_post, id_user, content, TO_CHAR(timestamp, 'YYYY-MM-DD HH24:MI:SS') AS timestamp, status;
    `;
    const result = await pool.query(query, [id_post, id_user, content, timestamp, status]);
    return new Comment(result.rows[0]);
  }

  async updateContentComment(id_comment, content) {
    const query = `
      UPDATE "comment"
      SET content = $1, status = 3
      WHERE id_comment = $2
      RETURNING id_comment, content, status;
    `;

    const result = await pool.query(query, [content, id_comment]);
    return result.rows[0] ? new Comment(result.rows[0]) : null;
  }

  async updateStatusComment(id_comment, status) {
    const query = `
      UPDATE "comment"
      SET status = $2
      WHERE id_comment = $1
      RETURNING id_comment, status;
    `;
    const result = await pool.query(query, [id_comment, status]);
    return result.rows[0] ? new Comment(result.rows[0]) : null;
  }

  async getCommentById(id_comment) {
    const query = `
      SELECT
      id_comment,
      id_post,
      id_user,
      content,
      timestamp,
      status
      FROM "comment"
      WHERE id_comment = $1;
    `;
    const result = await pool.query(query, [id_comment]);
    return result.rows[0] ? new Comment(result.rows[0]) : null;
  }
}

export default new CommentModel();