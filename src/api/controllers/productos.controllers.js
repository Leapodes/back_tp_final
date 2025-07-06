import coneccion from '../db/baseDeDatos.js';

//CONTROLADOR DE PRODUCTOS

export async function obtenerProductos(req, res) {
    try {
        const query = "SELECT * FROM productos;";
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    };
};

export async function obtenerProductoPorId(req, res) {
    try {
        const id = req.params.id;
        const query = `SELECT * FROM productos WHERE id = "${id}";`;
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    };
};