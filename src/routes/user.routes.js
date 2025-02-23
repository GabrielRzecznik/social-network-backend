import { Router } from 'express';
import { registerUser, loginUser, updateUser } from '../controllers/user.controller.js';

const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);

export default router;