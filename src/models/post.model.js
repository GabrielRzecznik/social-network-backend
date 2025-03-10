class Post {
  constructor({ id_post, id_user, content, img, status }) {
    this.id_post = id_post;
    this.id_user = id_user;
    this.content = content;
    this.img = img;
    this.status = status;
  }
}

export default Post;