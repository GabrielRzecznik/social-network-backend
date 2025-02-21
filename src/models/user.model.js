import pool from "../config/db.js";

export default class User {
  static async createUser({ name, surname, email, username, password, img_user }) {
    const query = `INSERT INTO "user" (name, surname, email, username, password, img_user) 
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_user`;
    const values = [name, surname, email, username, password, img_user];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getUserByEmail(email) {
    const query = `SELECT * FROM "user" WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
}