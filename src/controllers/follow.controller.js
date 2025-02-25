import Follow from "../models/follow.model.js";

// Seguir un usuario
export const addFollow = async (req, res) => {
  const { sender_follow, receiver_follow } = req.body;

  try {
    const newFollow = await Follow.addFollow({ sender_follow, receiver_follow });
    
    res.status(201).json({ message: "Follow creado exitosamente", follow: newFollow });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
