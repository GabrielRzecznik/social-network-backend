import pool from "../config/db.js";

export const findUserByEmailOrUsername = async (email, username) => {
  const result = await pool.query(
    'SELECT * FROM "user" WHERE email = $1 OR username = $2',
    [email, username]
  );
  return result.rows[0] || null;
};

export const isUsernameTaken = async (id, username) => {
  id = parseInt(id, 10);

  const query = 'SELECT COUNT(*) FROM "user" WHERE username = $1 AND id_user != $2';

  try {
    const result = await pool.query(query, [username, id]);
    
    return parseInt(result.rows[0].count) > 0;
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    throw new Error("Error en la base de datos");
  }
};