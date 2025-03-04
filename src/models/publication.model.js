class Publicación {
  constructor({ id_publication, id_user, content_publication, img_publication, status_publication }) {
    this.id_publication = id_publication;
    this.id_user = id_user;
    this.content_publication = content_publication;
    this.img_publication = img_publication;
    this.status_publication = status_publication;
  }
}

export default Publicación;