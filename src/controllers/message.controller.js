import MessageService from '../services/message.service.js';

// Enviar mesanje
export const sendMessage = async (req, res) => {
  const sender = req.user.id_user;
  const { receiver, content } = req.body;

  try {
    const newMessage = await MessageService.sendMessage(
      sender, 
      receiver,
      content
    );

    res.status(201).json({ message: 'Mensaje enviado exitosamente', message: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar contenido mensaje
export const updateContentMessage = async (req, res) => {
  const { id_message, content } = req.body;

  try {
    const updatedContentMessage = await MessageService.updateContentMessage(id_message, content);
    
    res.status(200).json({ message: 'Mensaje actualizado exitosamente', message: updatedContentMessage });
  } catch (error) {
      res.status(400).json({ message: error.message });;
  }
};

// Actualizar status mensaje
export const updateStatusMessage = async (req, res) => {
  const { id_message, status } = req.body;

  try {
    const updatedStatusMessage = await MessageService.updateStatusMessage(id_message, status);

    res.status(200).json({ message: 'Estado del mensaje actualizado exitosamente', message: updatedStatusMessage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};