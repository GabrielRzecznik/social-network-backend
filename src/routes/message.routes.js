import { Router } from 'express';
import { sendMessage, updateMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/send', protectRoute, sendMessage);
router.put('/update', protectRoute, updateMessage);

export default router;