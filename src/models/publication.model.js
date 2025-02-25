import pool from "../config/db.js";

class Publication {
  // Crear publicación
  static async createPublication({ id_user, content_publication, img_publication }) {
    const query = `
      INSERT INTO "publication" (id_user, content_publication, img_publication)
      VALUES ($1, $2, $3)
      RETURNING id_publication, id_user, content_publication, img_publication;
    `;
    const result = await pool.query(query, [id_user, content_publication, img_publication]);
    return result.rows[0];
  }

  // Editar publicación
  static async updatePublication(id_publication, { content_publication, img_publication }) {
    const query = `
      UPDATE "publication"
      SET content_publication = $1, img_publication = $2
      WHERE id_publication = $3
      RETURNING id_publication, content_publication, img_publication;
    `;
    const result = await pool.query(query, [content_publication, img_publication, id_publication]);
    return result.rows[0];
  }

  // Editar status de publicación
  static async updateStatusPublication({ id_publication, status_publication }) {
    
    const query = `
      UPDATE "publication"
      SET status_publication = $2
      WHERE id_publication = $1
      RETURNING id_publication, content_publication, img_publication, status_publication;
    `;
    const result = await pool.query(query, [id_publication, status_publication]);
    return result.rows[0];
  }
}

export default Publication;