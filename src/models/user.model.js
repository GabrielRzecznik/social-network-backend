class User {
  constructor({ id_user, name, surname, email, username, birthdate, password, img, description }) {
    this.id_user = id_user;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.username = username;
    this.birthdate = birthdate;
    this.password = password;
    this.img = img;
    this.status = description;
  }
}

export default User;