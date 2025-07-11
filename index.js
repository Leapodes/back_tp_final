import express from 'express'
import environments from './src/api/config/environments.js';
import { peliculasRoutes, productosRoutes, vistasRoutes } from './src/api/routes/index.js'
import cors from 'cors'

const app = express();
const PORT = environments.PORT;

// EJS
app.set("view engine", "ejs");
app.set("views", "./src/vistas");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/dashboard", vistasRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Servidor abierto en el puerto ${PORT}`);
});