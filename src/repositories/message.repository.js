import pool from '../config/db.js';
import Message from '../models/message.model.js';

class MessageRepository {
  async sendMessage(sender, receiver, content, timestamp, status, id_chat) {
    const query = `
      INSERT INTO "message" (sender, receiver, content, timestamp, status, id_chat)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_message, sender, receiver, content, timestamp, status, id_chat;
    `;
    const result = await pool.query(query, [sender, receiver, content, timestamp, status, id_chat]);
    return new Message(result.rows[0]);
  }

  async updateContentMessage(id_message, content) {
    const query = `
      UPDATE "message"
      SET content = $1, status = 3
      WHERE id_message = $2
      RETURNING id_message, content, status;
    `;

    const result = await pool.query(query, [content, id_message]);
    return result.rows[0] ? new Message(result.rows[0]) : null;
  }

  async updateStatusMessage(id_message, status) {
    const query = `
      UPDATE "message"
      SET status_message = $2
      WHERE id_message = $1
      RETURNING id_message, sender, receiver, content, timestamp, status;
    `;

    const result = await pool.query(query, [id_message, status]);
    return result.rows[0] ? new Message(result.rows[0]) : null;
  }

  async getChatContentMessages(id_chat) {
    const query = `
      SELECT id_message, sender, receiver, content, timestamp, status
      FROM "message"
      WHERE id_chat = $1 AND status <> 0
      ORDER BY timestamp ASC;
    `;
    const result = await pool.query(query, [id_chat]);
    return result.rows[0] ? new Message(result.rows[0]) : null;
  }

  async getMessageById(id_message) {
    const query = `
      SELECT id_message, sender, receiver, content, timestamp, status, id_chat
      FROM "message"
      WHERE id_message = $1;
    `;
    const result = await pool.query(query, [id_message]);
    return result.rows[0] ? new Message(result.rows[0]) : null;
  }
}

export default new MessageRepository();