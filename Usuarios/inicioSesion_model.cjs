const db = require('../db.cjs');

const getExistentUser = async (usuario, contrasena) => {
    let result = await db.query('SELECT usuario_aliado FROM aliados a WHERE a.usuario_aliado = $1 AND contrasena = $2', [usuario, contrasena]);
    if (result.rows.length > 0) {
        return {
            usuario: result.rows[0].usuario_aliado,
            tipo_usuario: 'aliado',
            estatus_activo: result.rows[0].estatus_activo,
        };
    }

    result = await db.query('SELECT usuario_escuela FROM administradores_de_escuela ade WHERE ade.usuario_escuela = $1 AND contrasena = $2', [usuario, contrasena]);
    if (result.rows.length > 0) {
        return {
            usuario: result.rows[0].usuario_escuela,
            tipo_usuario: 'escuela',
            estatus_activo: result.rows[0].estatus_activo,
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

const registerAliado = (nombre, usuario, contrasena, email, empresa, sector, direccion) => {
    const request = db.query('INSERT INTO aliados (usuario_aliado, nombre, contrasena, email, empresa, sector, direccion, estatus_activo) VALUES ($1, $2, $3, $4, $5, $6, $7, false)', [usuario, nombre, contrasena, email, empresa, sector, direccion]);
    return request.rows;
}

const registerEscuela = (nombre, usuario, contrasena, email, escuela, cct, direccion) => {
    const request = db.query('INSERT INTO administradores_de_escuela (usuario_escuela, nombre, contrasena, email, escuela, cct, direccion, estatus_activo) VALUES ($1, $2, $3, $4, $5, $6, $7, false)', [usuario, nombre, contrasena, email, escuela, cct, direccion]);
    return request.rows;
}

module.exports = { getExistentUser, registerAliado, registerEscuela }