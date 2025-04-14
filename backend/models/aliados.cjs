const db = require('../db.cjs');

const getAllAliados = async () => {
    const res = await db.query('SELECT * FROM aliados');
    // console.log(res.rows);
    return res.rows;
}

const getAllActiveAliados = async () => {
    const res = await db.query('SELECT * FROM aliados WHERE estatus_activo = true');
    // console.log(res.rows);
    return res.rows;
}

const getApoyosByAliado = async (aliado) => {
    const res = await db.query('SELECT DISTINCT tipo_apoyo FROM tipos_de_apoyo_a_brindar WHERE usuario_aliado = $1', [aliado]);
    // console.log(res.rows);
    return res.rows;
}

const getDistinctApoyos = async () => {
    const res = await db.query('SELECT DISTINCT tipo_apoyo FROM tipos_de_apoyo_a_brindar tdaab JOIN aliados a ON tdaab.usuario_aliado = a.usuario_aliado WHERE a.estatus_activo = true');
    console.log(res.rows);
    return res.rows;
}

const getSectores = async () => {
    const res = await db.query('SELECT DISTINCT sector FROM aliados WHERE estatus_activo = true');
    console.log(res.rows);
    return res.rows;
}

module.exports = { getAllAliados, getAllActiveAliados, getApoyosByAliado, getDistinctApoyos, getSectores }