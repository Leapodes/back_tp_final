import express from 'express'
import coneccion from './baseDeDatos.js';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./vistas");

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

// Admin / Backend
app.get("/admin", async (req, res) => {
    try {
        const [productos] = await coneccion.query("SELECT * FROM productos");
        const [categorias] = await coneccion.query("SELECT * FROM categorias");
        const [usuarios] = await coneccion.query("SELECT * FROM usuarios");
        const [ventas] = await coneccion.query("SELECT * FROM ventas");

        res.render("backend", { productos, categorias, usuarios, ventas });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error cargando los datos");
    }
});

app.post("/admin/:table/add", async (req, res) => {
    const table = req.params.table;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const placeholders = fields.map(() => "?").join(", ");
    const query = `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${placeholders})`;

    try {
        await coneccion.query(query, values);
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar registro");
    }
});

app.post("/admin/:table/edit", async (req, res) => {
    const table = req.params.table;
    const { id, ...rest } = req.body;
    const fields = Object.keys(rest);
    const values = Object.values(rest);

    const setClause = fields.map(f => `${f} = ?`).join(", ");
    const query = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

    try {
        await coneccion.query(query, [...values, id]);
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al modificar registro");
    }
});

app.post("/admin/:table/delete", async (req, res) => {
    const table = req.params.table;
    const { id } = req.body;

    const query = `DELETE FROM ${table} WHERE id = ?`;

    try {
        await coneccion.query(query, [id]);
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar registro");
    }
});



// Server
app.listen(3000, "localhost", () => {
    console.log("Servidor abierto en http://localhost:3000")
})