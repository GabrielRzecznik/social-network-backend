import UserService from '../services/user.service.js';
import { generateAccessToken, generateRefreshToken } from '../services/auth.service.js';

export const registerUser = async (req, res) => {
  try {
    const newUser = await UserService.registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await UserService.loginUser(email, username, password);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const updatedUser = await UserService.updateUser(id, req.body);
    res.json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const id_user = req.user.id_user;
  const { current_password, new_password } = req.body;

  try {
    await UserService.updatePassword(id_user, current_password, new_password);
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};