import express from 'express'
import coneccion from './baseDeDatos.js';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Pagina principal</h1>")
})

app.get("/Menu", (req, res) => {
    const body = req.body
    res.send(`Bievenido al menu \n ${body}`);
})

app.get("/Menu/Producto", (req, res) => {
    const producto = req.body
    // guarda el producto o hace lo que necesite
    res.send(`${producto} guardado.`);
})

app.get("/Menu/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    res.send(`Buenas tardes, ${nombre}`);
})

// Productos
app.get("/productos", async (req, res) => {
    try {
        const query = "SELECT * FROM productos;";
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})

app.get("/productos/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const query = `SELECT * FROM productos WHERE nombre = "${nombre}";`;
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})

app.get("/productos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM productos WHERE id = "${id}";`;
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})

// Categorias
app.get("/categorias", async (req, res) => {
    try {
        const query = "SELECT * FROM categorias;";
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})

app.get("/categorias/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM categorias WHERE id = "${id}";`;
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})

// Usuarios
app.get("/usuarios", async (req, res) => {
    try {
        const query = "SELECT * FROM usuarios;";
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})

app.get("/usuarios/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM usuarios WHERE id = "${id}";`;
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})


// Server
app.listen(3000, "localhost", () => {
    console.log("Servidor abierto en http://localhost:3000")
})