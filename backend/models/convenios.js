const db = require('../db.js');

const getAllConvenios = async () => {
    return await db.query('SELECT c.*, upc.usuario_aliado, upc.usuario_escuela FROM convenio c JOIN usuarios_por_convenio upc ON upc.id_convenio = c.id_convenio;');
}

const getConveniosByAliado = async (aliado) => {
    return await db.query('SELECT c.* FROM convenio c JOIN usuarios_por_convenio upc ON upc.id_convenio = c.id_convenio WHERE upc.usuario_aliado = $1', [aliado])
}

const getConveniosByEscuela = async (escuela) => {
    return await db.query('SELECT c.* FROM convenio c JOIN usuarios_por_convenio upc ON upc.id_convenio = c.id_convenio WHERE upc.usuario_escuela = $1', [escuela])
}

module.exports = { getAllConvenios, getConveniosByAliado, getConveniosByEscuela }