import Follow from "../models/follow.model.js";
import { findFollowId, toggleFollow } from "../services/follow.service.js";

// Seguir un usuario
export const addFollow = async (req, res) => {
  const { id_user_1, id_user_2 } = req.body;

  const followIdResult = await findFollowId(id_user_1, id_user_2);
  if (followIdResult) {
    const id_follow = followIdResult.id_follow;
    
    const result = await toggleFollow(id_follow, true);
    return res.status(200).json({ message: 'Follow reactivado exitosamente', follow: result });
  }

  try {
    const newFollow = await Follow.addFollow({ id_user_1, id_user_2 });
    
    res.status(201).json({ message: "Follow creado exitosamente", follow: newFollow });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Dejar de seguir un usuario
export const removeFollow = async (req, res) => {
  const { id_user_1, id_user_2 } = req.body;

  const followIdResult = await findFollowId(id_user_1, id_user_2);
  if (!followIdResult) {
    return res.status(500).json({ message: 'No se encontro el follow' });
  }
  const id_follow = followIdResult.id_follow
  
  try {
    const result = await toggleFollow(id_follow, false);

    res.json({
      message: "Follow revocado exitosamente",
      user: result
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};