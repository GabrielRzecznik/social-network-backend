import { Router } from 'express';
import { createPost, updatePost, updateStatusPost } from '../controllers/post.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create', protectRoute, createPost);
router.put('/update', protectRoute, updatePost);
router.patch('/status', protectRoute, updateStatusPost);

export default router;
