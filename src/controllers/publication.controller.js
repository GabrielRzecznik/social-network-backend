import PublicationRepository from "../repositories/publication.repository.js";

// Crear publicación
export const createNewPublication = async (req, res) => {
  const { id_user, content_publication, img_publication } = req.body;

  try {
    const newPublication = await PublicationRepository.createPublication({ id_user, content_publication, img_publication });
    res.status(201).json({ message: "Publicación creada", publication: newPublication });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar publicación
export const updatePublication = async (req, res) => {
  const { id_publication } = req.params;
  const { content_publication, img_publication } = req.body;

  try {
    const publicationData = await PublicationRepository.getPublicationById(id_publication);

    if (
      publicationData.content_publication === content_publication &&
      publicationData.img_publication === img_publication
    ) {
      return res.status(200).json({ message: "No se realizaron cambios" });
    }

    const updatedPublication = await PublicationRepository.updatePublication(id_publication, {
      content_publication, img_publication
    });

    res.json({
      message: "Publicación actualizada exitosamente",
      publication: updatedPublication
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Editar status de publicación
export const updateStatusPublication = async (req, res) => {
  const { id_publication, status_publication } = req.body;

  try {
    const updatedStatusPublication = await PublicationRepository.updateStatusPublication({
      id_publication, status_publication
    });

    res.json({
      message: "Status de publicación actualizado exitosamente",
      publication: updatedStatusPublication
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
