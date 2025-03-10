import { Router } from 'express';
import { sendMessage, updateContentMessage, updateStatusMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/send', protectRoute, sendMessage);
router.patch('/content', protectRoute, updateContentMessage);
router.patch('/status', protectRoute, updateStatusMessage);

export default router;