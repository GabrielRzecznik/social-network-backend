import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id_user }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
}