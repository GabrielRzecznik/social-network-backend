import pool from '../config/db.js';
import User from '../models/user.model.js';

class UserRepository {
  async registerUser({ name, surname, email, username, birthdate, password, img_user }) {
    const query = `
      INSERT INTO "user" (name, surname, email, username, birthdate, password, img_user)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id_user, name, surname, email, username, TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate, img_user;
    `;
    const result = await pool.query(query, [name, surname, email, username, birthdate, password, img_user]);
    return new User(result.rows[0]);
  }

  async updateUser(id, { name, surname, email, username, birthdate, img_user }) {
    const query = `
      UPDATE "user"
      SET name = $1, surname = $2, email = $3, username = $4, birthdate = $5, img_user = $6
      WHERE id_user = $7
      RETURNING id_user, name, surname, email, username, TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate, img_user;
    `;
    const result = await pool.query(query, [name, surname, email, username, birthdate, img_user, id]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async updatePassword(id_user, new_password) {
    const query = `UPDATE "user" SET password = $2 WHERE id_user = $1 RETURNING *;`;
    const result = await pool.query(query, [id_user, new_password]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async getUserById(id) {
    const query = `SELECT * FROM "user" WHERE id_user = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async findByEmailOrUsername(email, username) {
    const query = `SELECT * FROM "user" WHERE email = $1 OR username = $2;`;
    const result = await pool.query(query, [email, username]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }
}

export default new UserRepository();
