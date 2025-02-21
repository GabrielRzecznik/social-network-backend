import pool from "../config/db.js";

export const findUserByEmailOrUsername = async (email, username) => {
  const result = await pool.query(
    'SELECT * FROM "user" WHERE email = $1 OR username = $2',
    [email, username]
  );
  return result.rows[0] || null;
};
