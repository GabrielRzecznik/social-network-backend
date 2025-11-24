import pool from '../config/db.js';
import Message from '../classes/message.class.js';

class MessageModel {
  async sendMessage(sender, receiver, content, timestamp, status, id_chat) {
    const query = `
      INSERT INTO "message" (sender, receiver, content, timestamp, status, id_chat)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_message, sender, receiver, content, TO_CHAR(timestamp, 'YYYY-MM-DD HH24:MI:SS') AS timestamp, status, id_chat;
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
      SET status = $2
      WHERE id_message = $1
      RETURNING id_message, status;
    `;
    const result = await pool.query(query, [id_message, status]);
    return result.rows[0] ? new Message(result.rows[0]) : null;
  }

  async getChatMessages(id_user, id_chat) {
    const query = `
      SELECT id_message, sender, receiver, content, timestamp, status
      FROM "message"
      WHERE id_chat = $2 
      AND status <> 0 
      AND $1 IN (sender, receiver)
      ORDER BY timestamp ASC;
    `;
    const result = await pool.query(query, [id_user, id_chat]);
    return result.rows;
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

export default new MessageModel();