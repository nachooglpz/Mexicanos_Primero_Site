const db = require('../db.js');

const getAllAliados = async () => {
    return await db.query('SELECT * FROM aliados WHERE estatus_activo = true');
}

const getAliadosByKeyword = async (empresa) => {
    return await db.query('SELECT * FROM aliados WHERE nombre = %$1% or empresa = %$1% or sector = %$1% AND estatus_activo = true', [empresa]);
}

const getAliadosBySector = async (sector) => {
    return await db.query('SELECT * FROM aliados WHERE sector = $1 AND estatus_activo = true', [sector]);
}

const getAliadosByTipoApoyo = async (apoyo) => {
    return await db.query('SELECT DISTINCT a.* FROM aliados a JOIN tipos_de_apoyo_a_brindar tdaab ON a.usuario_aliado = tdaab.usuario_aliado WHERE tdaab.tipo_apoyo = $1;', [apoyo]);
}

const getApoyosByAliado = async (aliado) => {
    return await db.query('SELECT DISTINCT tipo_apoyo FROM tipos_de_apoyo_a_brindar WHERE usuario_aliado = $1', [aliado]);
}

module.exports = { getAllAliados, getAliadosByKeyword, getAliadosBySector, getAliadosByTipoApoyo, getApoyosByAliado };