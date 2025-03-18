import { Router } from 'express';
import { sendComment, updateContentComment, updateStatusComment } from '../controllers/comment.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/send', protectRoute, sendComment);
router.patch('/content', protectRoute, updateContentComment);
router.patch('/status', protectRoute, updateStatusComment);

export default router;