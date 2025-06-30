import mysql from 'mysql2/promise.js'

const coneccion = mysql.createPool({
    host: 'localhost',
    database: 'tp_parcial',
    user: 'tp_final',
    password: 'trabajointegrador'
});

export default coneccion;