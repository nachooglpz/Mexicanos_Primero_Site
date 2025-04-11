const db = require('../db.js');

const getAllAliados = async () => {
    return await db.query('SELECT * FROM aliados WHERE estatus_activo = true');
}

const getApoyosByAliado = async (aliado) => {
    return await db.query('SELECT DISTINCT tipo_apoyo FROM tipos_de_apoyo_a_brindar WHERE usuario_aliado = $1', [aliado]);
}

module.exports = { getAllAliados, getApoyosByAliado }