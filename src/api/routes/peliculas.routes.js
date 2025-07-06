import { Router } from 'express'
import { obtenerPeliculaPorId, obtenerPeliculas } from '../controllers/peliculas.controllers.js';

const router = Router();

router.get("/", obtenerPeliculas);
router.get("/:id", obtenerPeliculaPorId);

export default router;