import User from '../models/user.model.js';
import { findUserByEmailOrUsername } from "../services/user.service.js";
import bcrypt from 'bcryptjs';
//import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, username, password } = req.query;
  try {
    const user = await findUserByEmailOrUsername(email, username);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export async function registerUser(req, res) {
  try {
    const { name, surname, email, username, password, img_user } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({ name, surname, email, username, password: hashedPassword, img_user });
    res.status(201).json({ message: 'Usuario registrado', userId: newUser.id_user });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
}