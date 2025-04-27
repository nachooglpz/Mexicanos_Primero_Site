const db = require('../db.cjs');

const getAdmin = async (usuarioAdmin) => {
    const res = await db.query('SELECT * FROM administrador WHERE usuario_admin = $1', [usuarioAdmin]);
    // console.log(res.rows);
    return res.rows;
}

const modificarAdmin = async (usuarioAdmin, nombre, email, contrasena) => {
    const res = await db.query('UPDATE administrador SET nombre = $1, email = $2, contrasena = $3 WHERE usuario_admin = $4', [nombre, email, contrasena, usuarioAdmin]);
    return res;
}

module.exports = { getAdmin, modificarAdmin }