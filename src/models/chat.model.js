import pool from "../config/db.js";

class Chat {
  // Buscar un chat entre dos usuarios
  static async findChatByUsers(sender_message, receiver_message) {
    const query = `
      SELECT * FROM "chat"
      WHERE (id_user1 = $1 AND id_user2 = $2) OR (id_user1 = $2 AND id_user2 = $1)
      LIMIT 1;
    `;
    const result = await pool.query(query, [sender_message, receiver_message]);
    return result.rows[0];
  }

  // Crear un nuevo chat entre dos usuarios
  static async createChat(sender_message, receiver_message) {
    const query = `
      INSERT INTO "chat" (id_user1, id_user2) 
      VALUES ($1, $2) 
      RETURNING id_chat;
    `;
    const result = await pool.query(query, [sender_message, receiver_message]);
    return result.rows[0];
  }
  
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

  // Actualizar status de un chat
  static async updateChat({ id_chat, status_chat }) {
    const query = `
      UPDATE "chat"
      SET status_chat = $2
      WHERE id_chat = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id_chat, status_chat]);
    return result.rows[0];
  }
}

export default Chat;