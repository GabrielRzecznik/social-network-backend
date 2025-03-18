import CommentService from '../services/comment.service.js';

// Enviar comentario
export const sendComment = async (req, res) => {
  const id_user = req.user.id_user;
  const { id_post, content } = req.body;

  try {
    const newComment = await CommentService.sendComment(
      id_post,
      id_user,
      content
    );

    res.status(201).json({ message: 'Comentario enviado exitosamente', message: newComment });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Actualizar contenido comentario
export const updateContentComment = async (req, res) => {
  const { id_comment, content } = req.body;

  try {
    const updatedContentComment = await CommentService.updateContentComment(id_comment, content);

    res.status(200).json({ message: 'Comentario actualizado exitosamente', message: updatedContentComment });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

// Actualizar status comentario
export const updateStatusComment = async (req, res) => {
  const { id_comment, status } = req.body;

  try {
    const updatedStatusComment = await CommentService.updateStatusComment(id_comment, status);

    res.status(200).json({ message: 'Estado comentario actualizado exitosamente', message: updatedStatusComment });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};