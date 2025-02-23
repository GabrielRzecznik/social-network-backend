import * as PublicationService from "../services/publication.service.js";

export const createNewPublication  = async (req, res) => {
  const { user_id, content } = req.body;

  try {
    const newPublication = await PublicationService.createPublication({ user_id, content });
    res.status(201).json({ message: "Publicación creada", publication: newPublication });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};