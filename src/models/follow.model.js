import pool from "../config/db.js";

class Follow {
  // Seguir un usuario
  static async addFollow({ sender_follow, receiver_follow }) {
    const query = `
      INSERT INTO "follow" (sender_follow, receiver_follow)
      VALUES ($1, $2)
      RETURNING id_follow, sender_follow, receiver_follow, status_follow;
    `;
    const result = await pool.query(query, [sender_follow, receiver_follow]);
    return result.rows[0];
  }

  // Obtener ID del follow
  static async findFollowId({ id_user_1, id_user_2 }) {
    const query = 'SELECT * FROM "follow" WHERE (sender_follow = $1 OR sender_follow = $2) AND (receiver_follow = $1 OR receiver_follow = $2);';
    const result = await pool.query(query, [id_user_1, id_user_2]);
    return result.rows[0] || null;
  }

  // Dejar de seguir un usuario
  static async removeFollow( id_follow ) {
    const query = `
      UPDATE "follow"
      SET status_follow = false
      WHERE id_follow = $1
      RETURNING id_follow, sender_follow, receiver_follow, status_follow;
    `;
    const result = await pool.query(query, [id_follow]);
    return result.rows[0];
  }
}

export default Follow;