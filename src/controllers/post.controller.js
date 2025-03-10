import PostService from '../services/post.service.js';

// Crear post
export const createPost = async (req, res) => {
  const id_user = req.user.id_user;
  const { content, img } = req.body;
  
  try {
      const newPost = await PostService.createPost(id_user, content, img);
      res.status(201).json({ message: 'Post creado exitosamente', post: newPost });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Actualizar post
export const updatePost = async (req, res) => {
  const { id_post, content, img } = req.body;

  try {
    const updatedPost = await PostService.updatePost(id_post, content, img);

    res.json({ message: 'Post actualizado exitosamente', post: updatedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar status post
export const updateStatusPost = async (req, res) => {
  const { id_post, status } = req.body;

  try {
    const updatedStatusPost = await PostService.updateStatusPost(id_post, status);

    res.json({
      message: 'Estado post actualizado exitosamente',
      post: updatedStatusPost
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};