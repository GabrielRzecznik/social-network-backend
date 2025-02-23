import User from "../models/user.model.js";

export const getUserById = async (id) => {
  return await User.getUserById(id);
};

export const findUserByEmailOrUsername = async (email, username) => {
  return await User.findByEmailOrUsername(email, username);
};
