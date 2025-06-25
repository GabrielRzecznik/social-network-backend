import { Router } from 'express';
import { createPost, updatePost, updateStatusPost, getPostsByUser, getFeedPosts } from '../controllers/post.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create', protectRoute, createPost);
router.put('/update', protectRoute, updatePost);
router.patch('/status', protectRoute, updateStatusPost);
router.get('/feed', protectRoute, getFeedPosts);
router.get('/:username', protectRoute, getPostsByUser);

export default router;
