import { Router } from 'express';
import { createNewPublication, updatePublication, updateStatusPublication } from '../controllers/publication.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create', protectRoute, createNewPublication);
router.put('/update', protectRoute, updatePublication);
router.patch('/status', protectRoute, updateStatusPublication);

export default router;
