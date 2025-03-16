import { Router } from 'express';
import { getListChats, getChatMessages, updateChat } from '../controllers/chat.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/list', protectRoute, getListChats);
router.post('/:id_chat', protectRoute, getChatMessages);
router.patch('/status', protectRoute, updateChat);

export default router;