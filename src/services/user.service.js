import User from "../models/user.model.js";

// Obtener usuario por ID
export const getUserById = async (id) => {
  return await User.getUserById(id);
};

// Buscar usuario por email o username
export const findUserByEmailOrUsername = async (email, username) => {
  return await User.findByEmailOrUsername(email, username);
};
