import Message from "../models/message.model.js";
//import {  } from "../services/message.service.js";

// Enviar mesanje
export const sendMessage = async (req, res) => {
  const { sender_message, receiver_message, content_message, timestamp_message } = req.body;
  const status_message = 1;

  try {
    const newMessage = await Message.sendMessage({ sender_message, receiver_message, content_message, timestamp_message, status_message });
    
    res.status(201).json({ message: "Mensaje enviado exitosamente", message: newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};