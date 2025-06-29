import mysql from 'mysql2/promise.js'

const coneccion = mysql.createPool({
    host: 'localhost',
    database: 'productos',
    user: 'tp_final',
    password: 'trabajointegrador'
});

export default coneccion;