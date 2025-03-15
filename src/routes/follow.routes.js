import { Router } from 'express';
import { addFollow, updateStatusFollow, getFollowsCount, getFollowers, getFollowings } from '../controllers/follow.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/add' , protectRoute, addFollow);
router.patch('/status', protectRoute, updateStatusFollow);
router.get('/count', protectRoute, getFollowsCount);
router.get('/followers', protectRoute, getFollowers);
router.get('/followings', protectRoute, getFollowings);

export default router;