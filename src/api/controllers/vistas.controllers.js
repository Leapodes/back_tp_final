import coneccion from '../db/baseDeDatos.js';

// CONTROLADOR DE VISTAS (CRUD)

export async function mostrarTablas(req, res) {
    try {
        // Tablas para mostrar en el CRUD del backend
        const [peliculas] = await coneccion.query("SELECT * FROM peliculas");
        const [productos] = await coneccion.query("SELECT * FROM productos");

        res.render("backend", { peliculas, productos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error cargando los datos");
    };
};

export async function insertarDatos(req, res) {
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
    };
};

export async function modificarDatos(req, res) {
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
        };
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al modificar registro");
    };
}

export async function borrarDatos(req, res) {
    const tabla = req.params.tabla;
    const { id } = req.body;

    const query = `DELETE FROM ${tabla} WHERE id = ?`;

    try {
        const [resultado] = await coneccion.query(query, [id]);

        if (resultado.affectedRows > 0) {
            res.redirect("/admin");
        } else {
            res.status(404).send(`<script>alert("No se encontró ningún registro con ese ID."); window.location.href = "/admin";</script>`);
        };
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar registro");
    };
};