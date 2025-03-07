import { userRegisterSchema } from "../validators/user.validator.js";
import userRepository from '../repositories/user.repository.js';
import { generateAccessToken, verifyRefreshToken } from '../services/auth.service.js';
import bcrypt from 'bcryptjs';

class UserService {
  async registerUser(userData) {
    const { error } = userRegisterSchema.validate(userData);
    if (error) throw new Error(error.details[0].message);

    const { email, username } = userData;

    const usernameTaken = await userRepository.findByEmailOrUsername(null, username);
    if (usernameTaken) throw new Error('Username no disponible');

    const emailTaken = await userRepository.findByEmailOrUsername(email, null);
    if (emailTaken) throw new Error('Email no disponible');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return userRepository.registerUser({ ...userData, password: hashedPassword });
  }

  async loginUser(email, username, password) {
    const user = await userRepository.findByEmailOrUsername(email, username);
    if (!user) throw new Error('Usuario no encontrado');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Contraseña incorrecta');

    return user;
  }

  async updateUser(id_user, userData) {
    const currentUser = await userRepository.getUserById(id_user);
    if (!currentUser) throw new Error('Usuario no encontrado');

    if (currentUser.birthdate instanceof Date) {
      currentUser.birthdate = currentUser.birthdate.toISOString().split('T')[0]; 
    }

    const isSameData = Object.keys(userData).every(key => {
      return String(currentUser[key]) === String(userData[key]);
    });

    if (isSameData) throw new Error('No hay cambios en los datos del usuario');

    const usernameTaken = await userRepository.findByEmailOrUsername(null, userData.username);
    if (usernameTaken && usernameTaken.id_user !== id_user) throw new Error('Username no disponible');

    const emailTaken = await userRepository.findByEmailOrUsername(userData.email, null);
    if (emailTaken && emailTaken.id_user !== id_user) throw new Error('Email no disponible');

    return await userRepository.updateUser(id_user, userData);
  }

  async updateStatus(id_user, status) {
          const user = await ChatRepository.getUserById(id_user);
          if (!user) throw new Error('Usuario no encontrado');
          if (user.status === status) throw new Error('Estado sin cambios');
          
          return ChatRepository.updateChat(id_chat, status);
  }

  async updatePassword(id_user, current_password, new_password) {
    const user = await userRepository.getUserById(id_user);
    if (!user) throw new Error('Usuario no encontrado');

    const validPassword = await bcrypt.compare(current_password, user.password);
    if (!validPassword) throw new Error('Contraseña actual incorrecta');

    const samePassword = await bcrypt.compare(new_password, user.password);
    if (samePassword) throw new Error('La nueva contraseña no puede ser igual a la actual');

    const hashedPassword = await bcrypt.hash(new_password, 10);
    return await userRepository.updatePassword(id_user, hashedPassword);
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) throw new Error("No hay refresh token");
  
    const decoded = verifyRefreshToken(refreshToken);
  
    const user = await userRepository.getUserById(decoded.id_user);
    if (!user) throw new Error("Usuario no encontrado");
  
    return generateAccessToken(user);
  }
}

export default new UserService();