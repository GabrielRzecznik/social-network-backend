import { verifyToken } from "../services/auth.service.js";

export const protectRoute = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;  // Guardamos la información del usuario en el request
    next();  // Continuamos con la siguiente función de middleware o ruta
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};
