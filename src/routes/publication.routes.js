import { Router } from "express";
import { createNewPublication, updatePublication } from "../controllers/publication.controller.js";

const router = Router();

router.post("/create", createNewPublication);
router.put("/:id_publication", updatePublication);

export default router;