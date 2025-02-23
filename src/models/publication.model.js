import pool from "../config/db.js";

class Publication {
  static async createPublication({ user_id, content }) {
    const query = `
      INSERT INTO publication (user_id, content)
      VALUES ($1, $2)
      RETURNING id_publication, user_id, content, created_at;
    `;
    const result = await pool.query(query, [user_id, content]);
    return result.rows[0];
  }
}

export default Publication;