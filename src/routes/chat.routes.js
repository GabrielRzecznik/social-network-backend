import { Router } from 'express';
import { getUserChats, getChat, updateChat } from '../controllers/chat.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('list', protectRoute, getUserChats);
router.post('/:id_chat', protectRoute, getChat);
router.patch('/status', protectRoute, updateChat);

export default router;