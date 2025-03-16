import pool from '../config/db.js';
import Chat from '../models/chat.model.js';

class ChatRepository {
  async findChatByUsers(sender_message, receiver_message) {
    const query = `
      SELECT * FROM "chat"
      WHERE (id_user1 = $1 AND id_user2 = $2) OR (id_user1 = $2 AND id_user2 = $1)
      LIMIT 1;
    `;
    const result = await pool.query(query, [sender_message, receiver_message]);
    return result.rows[0] ? new Chat(result.rows[0]) : null;
  }

  async createChat(sender_message, receiver_message) {
    const query = `
      INSERT INTO "chat" (id_user1, id_user2) 
      VALUES ($1, $2) 
      RETURNING id_chat;
    `;
    const result = await pool.query(query, [sender_message, receiver_message]);
    return new Chat(result.rows[0]);
  }
  
  async getUserChats(id_user) {
    const query = `
      SELECT * FROM "chat"
      WHERE id_user1 = $1 OR id_user2 = $1;
    `;
    const result = await pool.query(query, [id_user]);
    return result.rows;
  }

  async updateChat(id_chat, status) {
    const query = `
      UPDATE "chat"
      SET status = $2
      WHERE id_chat = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id_chat, status]);
    return result.rows[0] ? new Chat(result.rows[0]) : null;
  }

  async getChat(id_chat) {
    const query = `
      SELECT * FROM "chat"
      WHERE id_chat = $1;
    `;
    const result = await pool.query(query, [id_chat]);
    return result.rows[0] ? new Chat(result.rows[0]) : null;
  }
}

export default new ChatRepository();

