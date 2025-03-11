import MessageService from '../services/message.service.js';
import { getCurrentTimestamp } from '../utils/timesstampUtils.js';

// Enviar mesanje
export const sendMessage = async (req, res) => {
  const { sender_message, receiver_message, content_message } = req.body;
  const timestamp_message = getCurrentTimestamp();
  const status_message = 1;

  try {
    const newMessage = await MessageService.sendMessage(
      sender_message, 
      receiver_message,
      content_message, 
      timestamp_message, 
      status_message
    );

    res.status(201).json({ message: 'Mensaje enviado exitosamente', message: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Editar contenido de un mensaje
export const updateContentMessage = async (req, res) => {
  const { id_message, content } = req.body;

  try {
    const updatedContentMessage = await MessageService.updateContentMessage({ id_message, content });
    
    res.status(200).json({ message: 'Mensaje actualizado exitosamente', message: updatedContentMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

//Editar status de un mensaje
export const updateStatusMessage = async (req, res) => {
  const { id_message, status } = req.body;

  try {
    const updatedStatusMessage = await MessageService.updateStatusMessage({ id_message, status });

    res.status(200).json({ message: 'Estado del mensaje actualizado exitosamente', message: updatedStatusMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};