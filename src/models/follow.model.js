import pool from "../config/db.js";

class Follow {
  // Seguir un usuario
  static async addFollow({ id_user_1, id_user_2 }) {
    const query = `
      INSERT INTO "follow" (sender_follow, receiver_follow)
      VALUES ($1, $2)
      RETURNING id_follow, sender_follow, receiver_follow, status_follow;
    `;
    const result = await pool.query(query, [id_user_1, id_user_2]);
    return result.rows[0];
  }

  // Obtener ID del follow
  static async findFollowId({ id_user_1, id_user_2 }) {
    const query = 'SELECT * FROM "follow" WHERE sender_follow = $1 AND receiver_follow = $2;';
    const result = await pool.query(query, [id_user_1, id_user_2]);
    return result.rows[0] || null;
  }

  // Dejar de seguir un usuario
  static async toggleFollow({ id_follow, value }) {
    const query = `
      UPDATE "follow"
      SET status_follow = $2
      WHERE id_follow = $1
      RETURNING id_follow, sender_follow, receiver_follow, status_follow;
    `;
    const result = await pool.query(query, [id_follow, value]);
    return result.rows[0];
  }
}

export default Follow;