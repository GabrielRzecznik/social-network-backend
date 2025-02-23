import User from "../models/user.model.js";
import { findUserByEmailOrUsername, getUserById } from "../services/user.service.js";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
  const { name, surname, email, username, password, img_user } = req.body;

  try {
    const existingUser = await findUserByEmailOrUsername(email, username);
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico o el nombre de usuario ya están en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.registerUser({
      name, surname, email, username, password: hashedPassword, img_user
    });

    res.status(201).json({ message: 'Usuario registrado', id_user: newUser.id_user });
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

export const updateUser = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id, 10);
  const { name, surname, email, username, password, img_user } = req.body;

  try {
    const userData = await getUserById(id);
    
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

    if (
      userData.name === name &&
      userData.surname === surname &&
      userData.email === email &&
      userData.username === username &&
      userData.img_user === img_user
    ) {
      return res.status(200).json({ message: "No se realizaron cambios" });
    }

    const usernameTaken = await findUserByEmailOrUsername(null, username);
    if (usernameTaken && usernameTaken.id_user !== id) {
      return res.status(404).json({ message: "Username no disponible" });
    }

    const emailTaken = await findUserByEmailOrUsername(email, null);
    if (emailTaken && emailTaken.id_user !== id) {
      return res.status(404).json({ message: "Email no disponible" });
    }

    const updatedUser = await User.updateUser(id, {
      name, surname, email, username, img_user
    });

    res.json({
      message: "Usuario actualizado exitosamente",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error:", error);
    if (error.message === 'El nombre de usuario ya está en uso') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
