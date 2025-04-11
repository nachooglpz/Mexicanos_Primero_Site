const db = require('../db.js');

const getAllEscuelas = async () => {
    return await db.query('SELECT * FROM administradores_de_escuela');
}

const getAllActiveEscuelas = async () => {
    return await db.query('SELECT * FROM administradores_de_escuela WHERE estatus_activo = true');
}

const getNecesidadesByEscuela = async (aliado) => {
    return await db.query('SELECT DISTINCT necesidad FROM necesidades WHERE usuario_aliado = $1', [aliado]);
}

module.exports = { getAllEscuelas, getAllActiveEscuelas, getNecesidadesByEscuela }