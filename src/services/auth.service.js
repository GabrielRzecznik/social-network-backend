import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET || "your-secret-key";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

// Generar un Access Token
export const generateAccessToken = (user) => {
  return jwt.sign({ id_user: user.id_user, username: user.username }, SECRET, { expiresIn: "30m" });
};

// Generar un Refresh Token
export const generateRefreshToken = (user) => {
  return jwt.sign({ id_user: user.id_user }, REFRESH_SECRET, { expiresIn: "7d" });
};

// Verificar un Access Token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error('Token no válido o expirado');
  }
};

// Verificar un Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    throw new Error('Refresh token no válido o expirado');
  }
};