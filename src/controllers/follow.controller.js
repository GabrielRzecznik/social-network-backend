import Follow from "../models/follow.model.js";
import { findFollowId, toggleFollow } from "../services/follow.service.js";

// Seguir un usuario
export const addFollow = async (req, res) => {
  const { id_user_1, id_user_2 } = req.body;

  const followIdResult = await findFollowId(id_user_1, id_user_2);
  if (followIdResult && followIdResult.status_follow === false) {
    const id_follow = followIdResult.id_follow;
    
    const result = await toggleFollow(id_follow, true);
    return res.status(200).json({ message: 'Follow reactivado exitosamente', follow: result });
  }else if (followIdResult && followIdResult.status_follow === true) {
    return res.status(500).json({ message: 'El usuario ya sigues al otro usuario' });
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
  }else if (followIdResult && followIdResult.status_follow === false) {
    return res.status(500).json({ message: 'El usuario no sigue al otro usuario' });
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

// Obtener cantidad de follows
export const getFollowsCount = async (req, res) => {
  const { id_user } = req.body;  
  
  try {
    const followStats = await Follow.getFollowsCount( id_user );

    res.json({
      message: "Follows obtenidos exitosamente",
      user: followStats
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener seguidores
export const getFollowers = async (req, res) => {
  const { id_user } = req.body;  
  
  try {
    const followers = await Follow.getFollowers( id_user );

    res.json({
      message: "Seguidores obtenidos exitosamente",
      user: followers
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};