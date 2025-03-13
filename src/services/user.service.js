import { userDataSchema } from '../validators/user.validator.js';
import UserRepository from '../repositories/user.repository.js';
import CustomError from '../utils/customError.util.js';
import { generateAccessToken, verifyRefreshToken } from '../services/auth.service.js';
import bcrypt from 'bcryptjs';

class UserService {
  // Registrar usuario
  async registerUser(userData) {
    const { error } = userDataSchema.validate(userData);
    if (error) throw new CustomError(error.details[0].message, 400);

    const { email, username } = userData;

    await this.findUsersWithSameEmailOrUsername(null, email, username);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return UserRepository.registerUser({ ...userData, password: hashedPassword });
  }

  // Iniciar sesión
  async loginUser(email, username, password) {
    const user = await UserRepository.findByEmailOrUsername(email, username);
    if (!user) throw new CustomError('Usuario no encontrado', 404);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new CustomError('Contraseña incorrecta', 401);

    return user;
  }

  // Obtener usuario
  async updateUser(id_user, userData) {
    const { error } = userDataSchema.validate(userData);
    if (error) throw new CustomError(error.details[0].message, 400);

    const currentUser = await this.getUserById(id_user);

    if (currentUser.birthdate instanceof Date) {
      currentUser.birthdate = currentUser.birthdate.toISOString().split('T')[0]; 
    }

    //Valida password
    const samePassword = await bcrypt.compare(userData.password, currentUser.password);
    if (!samePassword) throw new CustomError('Contraseña incorrecta', 401);

    //Valida cambios
    const filteredUserData = Object.fromEntries(
      Object.entries(userData).filter(([key]) => key !== "password")
    );

    const isSameData = Object.keys(filteredUserData).every(key => {
      return String(currentUser[key]) === String(filteredUserData[key]);
    });

    if (isSameData) throw new CustomError('Usuario sin cambios', 400);

    const usernameTaken = await UserRepository.findByEmailOrUsername(null, userData.username);
    if (usernameTaken && usernameTaken.id_user !== id_user) throw new CustomError('Username no disponible', 400);

    const emailTaken = await UserRepository.findByEmailOrUsername(userData.email, null);
    if (emailTaken && emailTaken.id_user !== id_user) throw new CustomError('Email no disponible', 400);

    return await UserRepository.updateUser(id_user, userData);
  }

  // Actualizar status usuario
  async updateStatus(id_user, status) {
          const user = await this.getUserById(id_user);
          if (user.status === status) throw new CustomError('Estado sin cambios', 400);
          
          return UserRepository.updateStatus(id_user, status);
  }

  // Actualizar contraseña usuario
  async updatePassword(id_user, current_password, new_password) {
    const { error } = userDataSchema.extract('password').validate(new_password);
    if (error) throw new CustomError(error.details[0].message, 400);

    const user = await this.getUserById(id_user);

    const validPassword = await bcrypt.compare(current_password, user.password);
    if (!validPassword) throw new CustomError('Contraseña actual incorrecta', 401);

    const samePassword = await bcrypt.compare(new_password, user.password);
    if (samePassword) throw new CustomError('Contraseñas identicas', 400);

    const hashedPassword = await bcrypt.hash(new_password, 10);
    return await UserRepository.updatePassword(id_user, hashedPassword);
  }

  // Obtener usuario por id
  async getUserById(id_user) {
    const user = await UserRepository.getUserById(id_user);
    if (!user) throw new CustomError('Usuario no encontrado', 404);
    
    return user;
  }

  async findUsersWithSameEmailOrUsername(id_user, email, username) {
    const users = await UserRepository.findUsersWithSameEmailOrUsername(email, username);
    
    let emailTaken = false;
    let usernameTaken = false;

    console.log(users)


    for (const user of users) {
        if ((user.id_user !== id_user) && (user.email === email)) emailTaken = true;
        if ((user.id_user !== id_user) && (user.username === username)) usernameTaken = true;
    }

    if (emailTaken && usernameTaken) throw new CustomError('Email y username no disponibles', 400);
    if (emailTaken) throw new CustomError('Email no disponible', 400);
    if (usernameTaken) throw new CustomError('Username no disponible', 400);
  }

  // Refresh token
  async refreshAccessToken(refreshToken) {
    if (!refreshToken) throw new CustomError('No hay refresh token', 400);
  
    const decoded = verifyRefreshToken(refreshToken);
    const user = await this.getUserById(decoded.id_user);
  
    return generateAccessToken(user);
  }
}

export default new UserService();