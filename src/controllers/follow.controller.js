import FollowService from '../services/follow.service.js';

// Seguir un usuario
export const addFollow = async (req, res) => {
  const id_user_1 = req.user.id_user;
  const { id_user_2 } = req.body;

  try {
    await FollowService.findFollowId(id_user_1, id_user_2);
    
    const newFollow = await FollowService.addFollow(id_user_1, id_user_2);
    
    res.status(201).json({ message: "Follow creado exitosamente", follow: newFollow });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar status follow
export const updateStatusFollow = async (req, res) => {
  const { id_follow, status } = req.body;
  
  try {
    const follow = await FollowService.toggleFollow(id_follow, status);

    res.json({
      message: "Follow revocado exitosamente",
      follow: follow
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener cantidad de follows
export const getFollowsCount = async (req, res) => {
  const { id_user } = req.body;  
  
  try {
    const followStats = await FollowService.getFollowsCount( id_user );

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
    const followers = await FollowService.getFollowers( id_user );

    res.json({
      message: "Seguidores obtenidos exitosamente",
      user: followers
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener seguidos
export const getFollowings = async (req, res) => {
  const { id_user } = req.body;  
  
  try {
    const followings = await FollowService.getFollowings( id_user );

    res.json({
      message: "Seguidos obtenidos exitosamente",
      user: followings
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};