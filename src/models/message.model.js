class Message {
  constructor({ id_message, sender, receiver, content, timestamp, status, id_chat }) {
    this.id_message = id_message;
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
    this.timestamp = timestamp;
    this.status = status;
    this.id_chat = id_chat;

  }
}

export default Message;