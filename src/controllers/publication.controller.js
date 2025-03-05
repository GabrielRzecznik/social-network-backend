import PublicationService from "../services/publication.service.js";

// Crear publicación
export const createNewPublication = async (req, res) => {
  const id_user = req.user.id_user;
  const { content_publication, img_publication } = req.body;
  
  try {
      const newPublication = await PublicationService.createPublication(id_user, content_publication, img_publication);
      res.status(201).json({ message: "Publicación creada", publication: newPublication });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Editar publicación
export const updatePublication = async (req, res) => {
  const { id_publication, content_publication, img_publication } = req.body;

  try {
    const updatedPublication = await PublicationService.updatePublication(id_publication, content_publication, img_publication);

    res.json({ message: 'Publicación actualizada exitosamente', publication: updatedPublication });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
