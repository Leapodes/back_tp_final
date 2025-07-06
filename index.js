import express from 'express'
import environments from './src/api/config/environments.js';
import { peliculasRoutes, productosRoutes, vistasRoutes } from './src/api/routes/index.js'
import cors from 'cors'

const app = express();
const PORT = environments.PORT;

// EJS
app.set("view engine", "ejs");
app.set("views", "./vistas");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// HAY QUE HACER LOS MIDDLEWARES  - (HECHO)

// Rutas
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/dashboard", vistasRoutes);

// TEMPORAL HASTA TERMINAR LAS RUTAS Y CONTROLADORES - (HECHO)

// Server
app.listen(PORT, () => {
    console.log(`Servidor abierto en el puerto ${PORT}`);
});