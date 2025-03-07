class Message {
  constructor({ id_message, sender_message, receiver_message, content_message, timestamp_message, status_message, id_chat }) {
    this.id_message = id_message;
    this.sender_message = sender_message;
    this.receiver_message = receiver_message;
    this.content_message = content_message;
    this.timestamp_message = timestamp_message;
    this.status_message = status_message;
    this.id_chat = id_chat;

  }
}

export default Message;