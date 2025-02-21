import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';

const router = Router();
router.post('/register', registerUser);
router.get('/login', loginUser);

export default router;