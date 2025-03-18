class Comment {
  constructor({ id_comment, id_publication, content, status }) {
    this.id_comment = id_comment;
    this.id_publication = id_publication;
    this.content = content;
    this.status = status;
  }
}

export default Comment;