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

  async updateUser(id_user, userData) {
    const { email, username } = userData;
    
    // Obtener el usuario actual
    const currentUser = await UserRepository.getUserById(id_user);
    if (!currentUser) {
        throw new Error('Usuario no encontrado');
    }

    // Verificar si hay cambios
    const isSameData = Object.keys(userData).every(key => currentUser[key] === userData[key]);
    if (isSameData) {
        throw new Error('No hay cambios en los datos del usuario');
    }

    // Verificar si el username ya están en uso
    const usernameTaken = await UserRepository.findByEmailOrUsername(null, username);
    if (usernameTaken && usernameTaken.id_user !== id_user) {
      throw new Error('Username no disponible');
    }

    // Verifica si el email ya está en uso
    const emailTaken = await UserRepository.findByEmailOrUsername(email, null);
    if (emailTaken && emailTaken.id_user !== id_user) {
      throw new Error('Email no disponible');
    }
    
    return UserRepository.updateUser(id_user, userData);
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