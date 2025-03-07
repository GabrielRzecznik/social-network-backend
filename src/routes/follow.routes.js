import { Router } from 'express';
import { addFollow, removeFollow, getFollowsCount, getFollowers, getFollowings } from '../controllers/follow.controller.js';

const router = Router();

router.post('/add', addFollow);
router.patch('/remove', removeFollow);
router.get('/follows-count', getFollowsCount);
router.get('/followers', getFollowers);
router.get('/followings', getFollowings);

export default router;