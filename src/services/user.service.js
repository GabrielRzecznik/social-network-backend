// services/UserService.js
import UserRepository from '../repositories/user.repository.js';
import bcrypt from 'bcryptjs';

class UserService {
  async registerUser(userData) {
    const { email, username } = userData;
    const existingUser = await UserRepository.findByEmailOrUsername(email, username);
    if (existingUser) {
      throw new Error('El correo electrónico o el nombre de usuario ya están en uso');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return UserRepository.registerUser({ ...userData, password: hashedPassword });
  }

  async loginUser(email, username, password) {
    const user = await UserRepository.findByEmailOrUsername(email, username);
    if (!user) throw new Error('Usuario no encontrado');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Contraseña incorrecta');

    return user;
  }

  async updateUser(id, userData) {
    const { email, username } = userData;
    const existingUser = await UserRepository.findByEmailOrUsername(email, username);
    if (existingUser && existingUser.id_user !== id) {
      throw new Error('El correo electrónico o el nombre de usuario ya están en uso');
    }

    return UserRepository.updateUser(id, userData);
  }

  async updatePassword(id_user, current_password, new_password) {
    const user = await UserRepository.getUserById(id_user);
    if (!user) throw new Error('Usuario no encontrado');

    const validPassword = await bcrypt.compare(current_password, user.password);
    if (!validPassword) throw new Error('Contraseña actual incorrecta');

    const samePassword = await bcrypt.compare(new_password, user.password);
    if (samePassword) throw new Error('La nueva contraseña no puede ser igual a la actual');

    const hashedPassword = await bcrypt.hash(new_password, 10);
    return UserRepository.updatePassword(id_user, hashedPassword);
  }
}

export default new UserService();