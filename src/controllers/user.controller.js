import userService from '../services/user.service.js';
import { generateAccessToken, generateRefreshToken } from '../services/auth.service.js';

export const registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    
    const { password: _, ...userData } = newUser;
    
    res.status(201).json({ message: 'Usuario registrado', user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await userService.loginUser(email, username, password);
    
    const { password: _, ...userData } = user;
    
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    res.json({ accessToken, refreshToken, user: userData });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const id_user = req.user.id_user;
  if (isNaN(id_user)) return res.status(400).json({ message: 'Usuario inválido' });

  try {
    const updatedUser = await userService.updateUser(id_user, req.body);

    const { password: _, ...userData } = updatedUser;

    res.json({ message: 'Usuario actualizado exitosamente', user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  const id_user = req.user.id_user;
  const { status } = req.body;

  try {
    const updatedStatus = await userService.updateStatus(id_user, status);
    res.json({ message: 'Estado usuario actualizado exitosamente', user: updatedStatus });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const id_user = req.user.id_user;
  const { current_password, new_password } = req.body;

  try {
    await userService.updatePassword(id_user, current_password, new_password);
    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const newAccessToken = await userService.refreshAccessToken(req.body.refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};