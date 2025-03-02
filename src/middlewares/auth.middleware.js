import { verifyAccessToken } from "../services/auth.service.js";

export const protectRoute = (req, res, next) => {
  // Obtener el token del header "Authorization"
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Si no hay token, devolver un error 403 (Acceso denegado)
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  try {
    // Verificar el token usando verifyAccessToken
    const decoded = verifyAccessToken(token);

    // Guardar la información del usuario en el objeto `req` para usarla en rutas posteriores
    req.user = decoded;

    // Continuar con la siguiente función de middleware o ruta
    next();
  } catch (error) {
    // Si el token no es válido o ha expirado, devolver un error 401 (No autorizado)
    res.status(401).json({ message: error.message || "Token no válido" });
  }
};