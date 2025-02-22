import pool from "../config/db.js";

export default class User {
  static async registerUser({ name, surname, email, username, password, img_user }) {
    const query = `
      INSERT INTO "user" (name, surname, email, username, password, img_user)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_user, name, surname, email, username, img_user;
    `;
    
    const result = await pool.query(query, [name, surname, email, username, password, img_user]);
    return result.rows[0];
  }
}