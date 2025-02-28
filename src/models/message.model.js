import pool from "../config/db.js";

class Message {
  // Enviar mensaje
  static async sendMessage({ sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat }) {
    const query = `
      INSERT INTO "message" (sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_message, sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat;
    `;
    const result = await pool.query(query, [sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat]);
    return result.rows[0];
  }

  // Editar mensaje
  static async updateMessage({ id_message, content_message }) {
    const query = `
    UPDATE "message"
    SET content_message = $1, status_message = 3
    WHERE id_message = $2
    RETURNING id_message, sender_message, receiver_message, content_message, timestamp_message, status_message;
    `;

    const result = await pool.query(query, [content_message, id_message]);
    return result.rows[0];
  }

  // Obtener mensajes de un chat
  static async getChatMessages({ id_chat }) {
    const query = `
      SELECT id_message, sender_message, receiver_message, content_message, timestamp_message, status_message
      FROM "message"
      WHERE id_chat = $1 AND status_message <> 0
      ORDER BY timestamp_message ASC;
    `;
    const result = await pool.query(query, [id_chat]);
    return result.rows;
  }
}

export default Message;