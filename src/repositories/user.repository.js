import pool from '../config/db.js';
import User from '../models/user.model.js';

class UserRepository {
  async registerUser({ name, surname, email, username, birthdate, password, img }) {
    const query = `
      INSERT INTO "user" (name, surname, email, username, birthdate, password, img)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id_user, name, surname, email, username, TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate, img, status;
    `;
    const result = await pool.query(query, [name, surname, email, username, birthdate, password, img]);
    return new User(result.rows[0]);
  }

  async updateUser(id, { name, surname, email, username, birthdate, img }) {
    const query = `
      UPDATE "user"
      SET name = $2, surname = $3, email = $4, username = $5, birthdate = $6, img = $7
      WHERE id_user = $1
      RETURNING id_user, name, surname, email, username, TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate, img;
    `;
    const result = await pool.query(query, [id, name, surname, email, username, birthdate, img]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async updateStatus(id_user, status) {
    console.log(status)
    const query = `
      UPDATE "user" 
      SET status = $2
      WHERE id_user = $1
      RETURNING status;
    `;
    const result = await pool.query(query, [id_user, status]);
    console.log(result.rows[0] ? new User(result.rows[0]) : null)
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async updatePassword(id_user, new_password) {
    const query = `
      UPDATE "user" 
      SET password = $2 
      WHERE id_user = $1;
    `;
    const result = await pool.query(query, [id_user, new_password]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async getUserById(id) {
    const query = `SELECT * FROM "user" WHERE id_user = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0] ? new User(result.rows[0]) : null;
  }

  async findByEmailOrUsername(email, username) {
    const query = `
      SELECT
        u.id_user,
        u.name,
        u.surname,
        u.email,
        u.username,
        u.password,
        TO_CHAR(u.birthdate, 'YYYY-MM-DD') AS birthdate,
        u.img,
        s.description
      FROM "user" u
      JOIN "user_status" s ON u.status = s.id_user_status
      WHERE email = $1 OR username = $2;
    `;

    const result = await pool.query(query, [email, username]);

    return result.rows[0] ? new User(result.rows[0]) : null;
  }
}

export default new UserRepository();
