import pool from "../config/db.js";
import Publication from "../models/publication.model.js";

// Crear una nueva publicación
export const createPublication = async (data) => {
  try {
    const newPublication = await Publication.createPublication(data);
    return newPublication;
  } catch (error) {
    throw new Error("Error al crear la publicación");
  }
};

// Obtener publicación por su ID
export const getPublicationById = async (id_publication) => {
  const query = 'SELECT * FROM "publication" WHERE id_publication = $1';
  const result = await pool.query(query, [id_publication]);
  return result.rows[0] || null;
};