const db = require('../db.cjs');

const getExistentUser = async (usuario, contrasena) => {
    let result = await db.query('SELECT usuario_aliado FROM aliados a WHERE a.usuario_aliado = $1 AND contrasena = $2', [usuario, contrasena]);
    if (result.rows.length > 0) {
        return {
            usuario: result.rows[0].usuario_aliado,
            tipo_usuario: 'aliado'
        };
    }

    result = await db.query('SELECT usuario_escuela FROM administradores_de_escuela ade WHERE ade.usuario_escuela = $1 AND contrasena = $2', [usuario, contrasena]);
    if (result.rows.length > 0) {
        return {
            usuario: result.rows[0].usuario_escuela,
            tipo_usuario: 'escuela'
        };
    }

    result = await db.query('SELECT usuario_admin FROM administrador a WHERE a.usuario_admin = $1 AND a.contrasena = $2', [usuario, contrasena]);
    if (result.rows.length > 0) {
        return {
            usuario: result.rows[0].usuario_admin,
            tipo_usuario: 'admin'
        };
    }
    else {
        return {
            usuario: null,
            tipo_usuario: null
        };
    }
}

module.exports = { getExistentUser }