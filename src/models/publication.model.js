import pool from "../config/db.js";

class Publication {
  static async createPublication({ id_user, content_publication, img_publication }) {
    const query = `
      INSERT INTO "publication" (id_user, content_publication, img_publication)
      VALUES ($1, $2, $3)
      RETURNING id_publication, id_user, content_publication, img_publication;
    `;
    const result = await pool.query(query, [id_user, content_publication, img_publication]);
    return result.rows[0];
  }
}

export default Publication;