import User from '../models/user.model.js';
import { findUserByEmailOrUsername } from "../services/user.service.js";
import bcrypt from 'bcryptjs';

export async function registerUser(req, res) {
  const { name, surname, email, username, password, img_user } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.registerUser({
      name, surname, email, username, password: hashedPassword, img_user
    });

    res.status(201).json({ message: 'Usuario registrado', userId: newUser.id_user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
}

export const loginUser = async (req, res) => {
  const { email, username, password } = req.body;
  
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