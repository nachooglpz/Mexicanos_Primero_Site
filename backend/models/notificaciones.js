const db = require('../db.js');

const getNoficicacionesByAliado = async (aliado) => {
    return await db.query('SELECT n.* FROM notificaciones n JOIN notificaciones_a_aliados naa ON naa.id_notificacion = n.id_notificacion WHERE naa.usuario_aliado = $1', [aliado]);
}

const getNoficicacionesByEscuela = async (escuela) => {
    return await db.query('SELECT n.* FROM notificaciones n JOIN notificaciones_a_administradores_de_escuelas naade ON naade.id_notificacion = n.id_notificacion WHERE naade.usuario_escuela = $1', [escuela]);
}

const getNoficicacionesByAdmin = async (admin) => {
    return await db.query('SELECT n.* FROM notificaciones n JOIN notificaciones_a_administradores_de_escuelas naade ON naade.id_notificacion = n.id_notificacion WHERE naade.usuario_admin = $1 OR naade.usuario_admin = $2', [admin, 'superadmin']);
}

module.exports = { getNoficicacionesByAliado, getNoficicacionesByEscuela, getNoficicacionesByAdmin }