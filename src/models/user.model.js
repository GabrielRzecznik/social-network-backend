import pool from "../config/db.js";

class User {
  static async registerUser({ name, surname, email, username, password, img_user }) {
    const query = `
      INSERT INTO "user" (name, surname, email, username, password, img_user)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_user, name, surname, email, username, img_user;
    `;
    const result = await pool.query(query, [name, surname, email, username, password, img_user]);
    return result.rows[0];
  }

  static async updateUser(id, { name, surname, email, username, img_user }) {
    const query = `
      UPDATE "user"
      SET name = $1, surname = $2, email = $3, username = $4, img_user = $5
      WHERE id_user = $6
      RETURNING id_user, name, surname, email, username, img_user;
    `;
    const result = await pool.query(query, [name, surname, email, username, img_user, id]);
    return result.rows[0];
  }
}

export default User; // Exportando como default
