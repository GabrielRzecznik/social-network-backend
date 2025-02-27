import pool from "../config/db.js";

class Chat {
  // Obtener chats de un usuario
  static async getUserChats({ id_user }) {
    const query = `
      SELECT id_chat, id_user1, id_user2, status_chat
      FROM "chat"
      WHERE id_user1 = $1 OR id_user2 = $1 AND status_chat = 1;
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows[0];
  }
}

export default Chat;