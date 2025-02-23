import pool from "../config/db.js";

export const getUserById = async (id) => {
  const query = 'SELECT * FROM "user" WHERE id_user = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

export const findUserByEmailOrUsername = async (email, username) => {
  const result = await pool.query(
    'SELECT * FROM "user" WHERE email = $1 OR username = $2',
    [email, username]
  );
  return result.rows[0] || null;
};
