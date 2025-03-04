import { Router } from "express";
import { createNewPublication, updatePublication, updateStatusPublication } from "../controllers/publication.controller.js";
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas con validación de usuario por token
router.post("/create", protectRoute, createNewPublication);
router.put("/:id_publication", protectRoute, updatePublication);
router.patch("/status", protectRoute, updateStatusPublication);

export default router;
