class Comment {
  constructor({ id_comment, id_publication, content, id_user, status,timestamp }) {
    this.id_comment = id_comment;
    this.id_publication = id_publication;
    this.content = content;
    this.id_user = id_user;
    this.status = status;
    this.timestamp = timestamp
  }
}

export default Comment;