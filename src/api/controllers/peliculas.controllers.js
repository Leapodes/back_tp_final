import coneccion from '../db/baseDeDatos.js';

// Controlador de peliculas

export async function obtenerPeliculas(req, res){
    try {
        const query = "SELECT * FROM peliculas;";
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    };
};

export async function obtenerPeliculaPorId (req, res){
    try {
        const id = req.params.id;
        const query = `SELECT * FROM peliculas WHERE id = "${id}";`;
        const [busqueda] = await coneccion.query(query);
        res.status(200).json({busqueda})
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    };
};