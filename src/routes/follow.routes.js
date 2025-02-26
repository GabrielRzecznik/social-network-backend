import { Router } from "express";
import { addFollow, removeFollow } from "../controllers/follow.controller.js";

const router = Router();

router.post("/add", addFollow);
router.patch("/remove", removeFollow);

export default router;