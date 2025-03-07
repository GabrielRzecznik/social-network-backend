import { Router } from 'express';
import { sendMessage, updateContentMessage, updateStatusMessage } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/send', protectRoute, sendMessage);
router.patch('/update-content', protectRoute, updateContentMessage);
router.patch('/update-status', protectRoute, updateStatusMessage);

export default router;