import { Router } from "express";
import { registerUser, loginUser, updateUser, updatePassword } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.patch("/password", updatePassword);

export default router;