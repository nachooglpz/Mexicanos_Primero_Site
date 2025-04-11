const db = require('../db.js');

const getAllAliados = async () => {
    return await db.query('SELECT * FROM aliados WHERE estatus_activo = true');
}

const getAliadosByKeyword = async (empresa) => {
    return await db.query('SELECT * FROM aliados WHERE nombre = $1 or empresa = $1 or sector = $1', [empresa]);
}

const getAliadosBySector = async (sector) => {
    return await db.query('SELECT * FROM aliados WHERE sector = $1', [sector]);
}

const getAliadosByTipoApoyo = async (apoyo) => {
    return await db.query('SELECT DISTINCT usuario_aliado FROM tipos_de_apoyo_a_brindar WHERE tipo_apoyo = $1', [apoyo]);
}

const getApoyosByAliado = async (aliado) => {
    return await db.query('SELECT tipo_apoyo FROM tipos_de_apoyo_a_brindar WHERE usuario_aliado = $1', [aliado]);
}

module.exports = { getAllAliados, getAliadosByKeyword, getAliadosBySector, getAliadosByTipoApoyo, getApoyosByAliado };