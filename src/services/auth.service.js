import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "your-secret-key";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

// Generar un Access Token
export const generateAccessToken = (user) => {
  return jwt.sign({ id_user: user.id_user, username: user.username }, SECRET, { expiresIn: "1h" });
};

// Generar un Refresh Token
export const generateRefreshToken = (user) => {
  return jwt.sign({ id_user: user.id_user }, REFRESH_SECRET, { expiresIn: "7d" });
};

// Verificar un Token
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

// Verificar un Refresh Token
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};
