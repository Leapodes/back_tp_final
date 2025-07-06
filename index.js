import express from 'express'
import environments from './src/api/config/environments.js';
import coneccion from './src/api/db/baseDeDatos.js';
import cors from 'cors'

const app = express();
const PORT = environments.PORT;

// Cosas de EJS
app.set("view engine", "ejs");
app.set("views", "./vistas");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// HAY QUE HACER LOS MIDDLEWARES

// Rutas
app.use("/api/peliculas", peliculasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/dashboard", vistasRoutes);

// TEMPORAL HASTA TERMINAR LAS RUTAS Y CONTROLADORES
app.get("/", (req, res) => {
    res.send("<h1>Pagina principal</h1>")
})

// Peliculas
app.get("/peliculas", async (req, res) => {
    try {
        const query = "SELECT * FROM peliculas;";
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
})

app.get("/peliculas/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM peliculas WHERE id = "${id}";`;
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
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



// Pagina Admin / Backend
app.get("/admin", async (req, res) => {
    try {
        // Tablas para mostrar en el CRUD del backend
        const [peliculas] = await coneccion.query("SELECT * FROM peliculas");
        const [productos] = await coneccion.query("SELECT * FROM productos");
   
        res.render("backend", { peliculas, productos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error cargando los datos");
    }
});

app.post("/admin/:tabla/insert", async (req, res) => {
    const tabla = req.params.tabla;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    const placeholders = campos.map(() => "?").join(", ");
    const query = `INSERT INTO ${tabla} (${campos.join(", ")}) VALUES (${placeholders})`;

    try {
        await coneccion.query(query, valores);
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar registro");
    }
});

app.post("/admin/:tabla/update", async (req, res) => {
    const tabla = req.params.tabla;
    const { id, ...rest } = req.body;
    const campos = Object.keys(rest);
    const valores = Object.values(rest);

    const setCampos = campos.map(f => `${f} = ?`).join(", ");
    const query = `UPDATE ${tabla} SET ${setCampos} WHERE id = ?`;

    try {
        const [resultado] = await coneccion.query(query, [...valores, id]);
        
        if (resultado.affectedRows > 0) {
            res.redirect("/admin");
        } else {
            res.status(404).send(`<script>alert("No se encontró ningún registro con ese ID."); window.location.href = "/admin";</script>`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al modificar registro");
    }
});

app.post("/admin/:tabla/delete", async (req, res) => {
    const tabla = req.params.tabla;
    const { id } = req.body;

    const query = `DELETE FROM ${tabla} WHERE id = ?`;

    try {
        const [resultado] = await coneccion.query(query, [id]);

        if (resultado.affectedRows > 0) {
            res.redirect("/admin");
        } else {
            res.status(404).send(`<script>alert("No se encontró ningún registro con ese ID."); window.location.href = "/admin";</script>`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar registro");
    }
});



// Server
app.listen(PORT, () => {
    console.log(`Servidor abierto en el puerto ${PORT}`);
})