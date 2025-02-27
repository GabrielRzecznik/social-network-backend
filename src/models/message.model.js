import pool from "../config/db.js";

class Message {
  // Enviar mensaje
  static async sendMessage({ sender_message, receiver_message, content_message, timestamp_message, status_message }) {
    const query = `
      INSERT INTO "message" (sender_message, receiver_message, content_message, timestamp_message, status_message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_message, sender_message, receiver_message, content_message, timestamp_message, status_message;
    `;
    const result = await pool.query(query, [sender_message, receiver_message, content_message, timestamp_message, status_message]);
    return result.rows[0];
  }
}

export default Message;