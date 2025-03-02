class User {
  constructor({ id_user, name, surname, email, username, birthdate, password, img_user }) {
    this.id_user = id_user;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.username = username;
    this.birthdate = birthdate;
    this.password = password;
    this.img_user = img_user;
  }
}

export default User;