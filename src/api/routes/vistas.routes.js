import { Router } from "express";
import { borrarDatos, insertarDatos, modificarDatos, mostrarTablas } from "../controllers/vistas.controllers.js";

// Rutas de vistas (CRUD)

const router = Router();

router.get("/admin", mostrarTablas);
router.post("/admin/:tabla/insert", insertarDatos);
router.post("/admin/:tabla/update", modificarDatos);
router.post("/admin/:tabla/delete", borrarDatos);

export default router;