import pool from '../config/db.js';
import Follow from '../classes/follow.class.js';

class FollowModel {
  // Seguir usuario
  async addFollow(id_user1, id_user2) {
    const query = `
      INSERT INTO "follow" (follower, following)
      VALUES ($1, $2)
      RETURNING id_follow, follower, following, status;
    `;
    const result = await pool.query(query, [id_user1, id_user2]);
    return new Follow(result.rows[0]);
  }

  // Obtener id_follow
  async findFollowId(id_user1, id_user2) {
    const query = `SELECT * FROM "follow" WHERE follower = $1 AND following = $2;`;
    const result = await pool.query(query, [id_user1, id_user2]);
    return result.rows[0] ? new Follow(result.rows[0]) : null;
  }

  // Modificar status follow
  async updateStatusFollow(id_follow, status) {
    const query = `
      UPDATE "follow"
      SET status = $2
      WHERE id_follow = $1
      RETURNING id_follow, follower, following, status;
    `;
    const result = await pool.query(query, [id_follow, status]);
    return result.rows[0] ? new Follow(result.rows[0]) : null;
  }

  // Obtener follow por id
  async getFollowById(id_follow) {
    const query = `SELECT * FROM "follow" WHERE id_follow = $1;`;
    const result = await pool.query(query, [id_follow]);
    return result.rows[0] ? new Follow(result.rows[0]) : null;
  }

  // Obtener cantidad de follows
  async getFollowsCount(id_user) {
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
  async getFollowers(id_user) {
    const query = `
      SELECT
        u.id_user,
        u.username,
        u.email,
        u.img
      FROM "follow" f
      JOIN "user" u ON f.follower = u.id_user
      WHERE f.following = $1 AND f.status = 1;
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows;
  }

  // Obtener seguidos
  async getFollowings(id_user) {
    const query = `
      SELECT
        u.id_user,
        u.username,
        u.email,
        u.img
      FROM "follow" f
      JOIN "user" u ON f.following = u.id_user
      WHERE f.follower = $1 AND f.status = 1;
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows;
  }
}

export default new FollowModel();