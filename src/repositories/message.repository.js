import pool from "../config/db.js";
import Message from '../models/message.model.js';

class MessageRepository {
  async sendMessage(sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat) {
    const query = `
      INSERT INTO "message" (sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_message, sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat;
    `;
    const result = await pool.query(query, [sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat]);
    return new Message(result.rows[0]);
  }

  async updateContentMessage(id_message, content_message) {
    const query = `
      UPDATE "message"
      SET content_message = $1, status_message = 3
      WHERE id_message = $2
      RETURNING id_message, sender_message, receiver_message, content_message, timestamp_message, status_message;
    `;

    const result = await pool.query(query, [content_message, id_message]);
    return result.rows[0] ? new Message(result.rows[0]) : null;
  }

  async updateStatusMessage(id_message, status_message) {
    const query = `
      UPDATE "message"
      SET status_message = $2
      WHERE id_message = $1
      RETURNING id_message, sender_message, receiver_message, content_message, timestamp_message, status_message;
    `;

    const result = await pool.query(query, [id_message, status_message]);
    return result.rows[0] ? new Message(result.rows[0]) : null;
  }

  async getChatContentMessages(id_chat) {
    const query = `
      SELECT id_message, sender_message, receiver_message, content_message, timestamp_message, status_message
      FROM "message"
      WHERE id_chat = $1 AND status_message <> 0
      ORDER BY timestamp_message ASC;
    `;
    const result = await pool.query(query, [id_chat]);
    return result.rows[0] ? new Message(result.rows[0]) : null;
  }
}

export default new MessageRepository();