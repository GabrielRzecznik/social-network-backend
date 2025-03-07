import { Router } from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { registerUser, loginUser, updateUser, updateStatus, updatePassword, refreshAccessToken } from '../controllers/user.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', protectRoute, updateUser);
router.patch('/status', protectRoute, updateStatus);
router.patch('/password', protectRoute, updatePassword);
router.post('/refresh', refreshAccessToken);

export default router;