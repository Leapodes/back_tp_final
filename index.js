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

app.get("/productos", async (req, res) => {
    try {
        const query = "SELECT * FROM snacks;";
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
        const query = `SELECT * FROM snacks WHERE Nombre = "${nombre}";`;
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})









app.listen(3000, "localhost", () => {
    console.log("Servidor abierto en http://localhost:3000")
})