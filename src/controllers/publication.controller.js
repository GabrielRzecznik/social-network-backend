import Publication from "../models/publication.model.js";
import { createPublication, getPublicationById } from "../services/publication.service.js";

// Crear publicación
export const createNewPublication  = async (req, res) => {
  const { id_user, content_publication, img_publication } = req.body;

  try {
    const newPublication = await createPublication({ id_user, content_publication, img_publication });
    res.status(201).json({ message: "Publicación creada", publication: newPublication });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar publicación
export const updatePublication = async (req, res) => {
  let { id_publication } = req.params;
  id_publication = parseInt(id_publication, 10);

  const { content_publication, img_publication } = req.body;

  try {
    const publicationData = await getPublicationById(id_publication);

    if (
      publicationData.content_publication === content_publication &&
      publicationData.img_publication === img_publication
    ) {
      return res.status(200).json({ message: "No se realizaron cambios" });
    }

    const updatedPublication = await Publication.updatePublication(id_publication, {
      content_publication, img_publication
    });

    res.json({
      message: "Publicación actualizada exitosamente",
      user: updatedPublication
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
