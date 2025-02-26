import pool from "../config/db.js";

class Follow {
  // Seguir un usuario
  static async addFollow({ id_user_1, id_user_2 }) {
    const query = `
      INSERT INTO "follow" (follower, following)
      VALUES ($1, $2)
      RETURNING id_follow, follower, following, status_follow;
    `;
    const result = await pool.query(query, [id_user_1, id_user_2]);
    return result.rows[0];
  }

  // Obtener ID del follow
  static async findFollowId({ id_user_1, id_user_2 }) {
    const query = 'SELECT * FROM "follow" WHERE follower = $1 AND following = $2;';
    const result = await pool.query(query, [id_user_1, id_user_2]);
    return result.rows[0] || null;
  }

  // Dejar de seguir un usuario
  static async toggleFollow({ id_follow, value }) {
    const query = `
      UPDATE "follow"
      SET status_follow = $2
      WHERE id_follow = $1
      RETURNING id_follow, follower, following, status_follow;
    `;
    const result = await pool.query(query, [id_follow, value]);
    return result.rows[0];
  }

  // Obtener cantidad de follows
  static async getFollowsCount(id_user) {
    const query = `
      SELECT
        COUNT(CASE WHEN follower = $1 THEN 1 END) AS followers,
        COUNT(CASE WHEN following = $1 THEN 1 END) AS followings
      FROM "follow";
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows[0];
  }

  // Obtener seguidores
  static async getFollowers(id_user) {
    const query = `
      SELECT
        u.id_user,
        u.username,
        u.email,
        u.img_user
      FROM "follow" f
      JOIN "user" u ON f.follower = u.id_user
      WHERE f.following = $1;
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows;
  }
}

export default Follow;