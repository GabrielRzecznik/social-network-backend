import { createPublication } from "../services/publication.service.js";

export const createNewPublication  = async (req, res) => {
  const { id_user, content_publication, img_publication } = req.body;

  try {
    const newPublication = await createPublication({ id_user, content_publication, img_publication });
    res.status(201).json({ message: "Publicación creada", publication: newPublication });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};