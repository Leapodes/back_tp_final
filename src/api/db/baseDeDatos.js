import mysql from 'mysql2/promise.js'
import environments from '../config/environments.js';

// Traemos las variables de entorno desde el archivo environments.js
const { DB } = environments;

const coneccion = mysql.createPool({
    host: DB.HOST,
    database: DB.NAME,
    user: DB.USER,
    password: DB.PASSWORD,
});

export default coneccion;