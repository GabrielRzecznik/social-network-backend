import pool from "../config/db.js";

class User {
  // Registrar usuario
  static async registerUser({ name, surname, email, username, password, img_user }) {
    const query = `
      INSERT INTO "user" (name, surname, email, username, password, img_user)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_user, name, surname, email, username, img_user;
    `;
    const result = await pool.query(query, [name, surname, email, username, password, img_user]);
    return result.rows[0];
  }

  // Editar usuario
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

  // Editar password
  static async updatePassword(id_user, new_password) {
    const query = `
      UPDATE "user"
      SET password = $2
      WHERE id_user = $1
    `;
    const result = await pool.query(query, [id_user, new_password]);
    return result.rows[0];
  }

  // Obtener usuario por ID
  static async getUserById(id) {
    const query = 'SELECT * FROM "user" WHERE id_user = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  // Buscar usuario por email o username
  static async findByEmailOrUsername(email, username) {
    const query = 'SELECT * FROM "user" WHERE email = $1 OR username = $2';
    const result = await pool.query(query, [email, username]);
    return result.rows[0] || null;
  }
}

export default User;
