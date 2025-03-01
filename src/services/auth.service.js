import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generar un JWT
export const generateToken = (user) => {
  const payload = { id_user: user.id_user, username: user.username };
  const secret = process.env.JWT_SECRET || "your-secret-key";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

// Verificar un JWT
export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET || "your-secret-key";

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Token no válido");
  }
};
