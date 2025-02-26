import Follow from "../models/follow.model.js";

// Obtener ID del follow
export const findFollowId = async (id_user_1, id_user_2) => {
  return await Follow.findFollowId({ id_user_1, id_user_2 });
};

// Volver a seguir un usuario
export const toggleFollow = async (id_follow, value) => {
  return await Follow.toggleFollow({ id_follow , value });
};