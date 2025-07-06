import { Router } from "express";
import { obtenerProductoPorId, obtenerProductos } from "../controllers/productos.controllers.js";

//  RUTA DE PRODUCTOS
const router = Router();

router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);

export default router;