import { Router } from 'express';
import { addFollow, updateStatusFollow, getFollowsCount, getFollowers, getFollowings } from '../controllers/follow.controller.js';

const router = Router();

router.post('/add', addFollow);
router.patch('/status', updateStatusFollow);
router.get('/count', getFollowsCount);
router.get('/followers', getFollowers);
router.get('/followings', getFollowings);

export default router;