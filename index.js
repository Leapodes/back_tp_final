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

// Pagina Admin / Backend
app.get("/admin", async (req, res) => {
    try {
        // Tablas para mostrar en el CRUD del backend
        const [productos] = await coneccion.query("SELECT * FROM productos");
        const [categorias] = await coneccion.query("SELECT * FROM categorias");
        const [usuarios] = await coneccion.query("SELECT * FROM usuarios");
        // const [ventas] = await coneccion.query("SELECT * FROM ventas"); // Tenemos que cambiar la tabla de ventas, por ahora la comentamos

        res.render("backend", { productos, categorias, usuarios });
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
app.listen(3000, "localhost", () => {
    console.log("Servidor abierto en http://localhost:3000")
})