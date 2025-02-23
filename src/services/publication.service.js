import Publication from "../models/publication.model.js";

export const createPublication = async (data) => {
  try {
    const newPublication = await Publication.createPublication(data);
    return newPublication;
  } catch (error) {
    throw new Error("Error al crear la publicación");
  }
};