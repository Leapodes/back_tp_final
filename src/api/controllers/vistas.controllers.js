import coneccion from '../db/baseDeDatos.js';

// Controlador de vistas (CRUD)

export async function mostrarTablas(req, res) {
    try {
        // Tablas para mostrar en el CRUD del backend
        const [peliculas] = await coneccion.query("SELECT * FROM peliculas;");
        const [productos] = await coneccion.query("SELECT * FROM productos;");

        res.render("backend", { peliculas, productos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error cargando los datos");
    };
};
 // Obtengo todas las peliculas y productos de la base de datos extrayendo las claves y valores de la bdd
export async function insertarDatos(req, res) {
    const tabla = req.params.tabla;
    const campos = Object.keys(req.body);
    const valores = Object.values(req.body);

    if (valores.includes("")) {
        return res.status(400).send(`<script>alert("Por favor, completa todos los campos."); window.location.href = "/dashboard/admin";</script>`);
    }

    const placeholders = campos.map(() => "?").join(", ");
    const query = `INSERT INTO ${tabla} (${campos.join(", ")}) VALUES (${placeholders})`;

    try {
        await coneccion.query(query, valores);
        res.redirect("/dashboard/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar registro");
    };
};
// Mismo que el anterior pero esta vez para modificarlo en las tablas de peliculas y/o productos
export async function modificarDatos(req, res) {
    const tabla = req.params.tabla;
    const { id, ...rest } = req.body;
    const campos = Object.keys(rest);
    const valores = Object.values(rest);

    if (!id) {
        return res.status(400).send(`<script>alert("Por favor, proporciona un ID válido."); window.location.href = "/dashboard/admin";</script>`);
    }

    const setCampos = campos.map(f => `${f} = ?`).join(", ");
    const query = `UPDATE ${tabla} SET ${setCampos} WHERE id = ?`;

    try {
        const [resultado] = await coneccion.query(query, [...valores, id]);

        if (resultado.affectedRows > 0) {
            res.redirect("/dashboard/admin");
        } else {
            res.status(404).send(`<script>alert("No se encontró ningún registro con ese ID."); window.location.href = "/dashboard/admin";</script>`);
        };
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al modificar registro");
    };
}

// Borra los datos de la tabla que haya seleccionado. Si no hay un dato relacionado sale un alert poniendo que no hay nada con ese registro
export async function borrarDatos(req, res) {
    const tabla = req.params.tabla;
    const { id } = req.body;

    if (!id) {
        return res.status(400).send(`<script>alert("Por favor, proporciona un ID válido."); window.location.href = "/dashboard/admin";</script>`);
    }

    const query = `UPDATE ${tabla} set ACTIVO = 0 WHERE id = ?`;

    try {
        const [resultado] = await coneccion.query(query, [id]);

        if (resultado.affectedRows > 0) {
            res.redirect("/dashboard/admin");
        } else {
            res.status(404).send(`<script>alert("No se encontró ningún registro con ese ID."); window.location.href = "/dashboard/admin";</script>`);
        };
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar registro");
    };
};