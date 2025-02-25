import pool from "../config/db.js";

class Follow {
  // Seguir un usuario
  static async addFollow({ sender_follow, receiver_follow }) {
    const query = `
      INSERT INTO "follow" (sender_follow, receiver_follow)
      VALUES ($1, $2)
      RETURNING id_follow, sender_follow, receiver_follow;
    `;
    const result = await pool.query(query, [sender_follow, receiver_follow]);
    return result.rows[0];
  }
}

export default Follow;