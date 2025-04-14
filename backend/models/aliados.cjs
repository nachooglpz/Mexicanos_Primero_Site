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

const getFilteredAliados = async (name, sector, apoyo) => {
    let res;
    if (name === '' && sector === '' && apoyo === '') {
        res = await db.query('SELECT * FROM aliados WHERE estatus_activo = true');
    } else if (name === '' && sector === '') {
        res = await db.query('SELECT * FROM aliados a JOIN tipos_de_apoyo_a_brindar tdaab ON a.usuario_aliado = tdaab.usuario_aliado WHERE tdaab.tipo_apoyo = $1 AND a.estatus_activo = true', [apoyo]);
    } else if (name === '' && apoyo === '') {
        res = await db.query('SELECT * FROM aliados WHERE sector = $1 AND estatus_activo = true', [sector]);
    } else if (sector === '' && apoyo === '') {
        res = await db.query('SELECT * FROM aliados WHERE nombre LIKE $1 AND estatus_activo = true', [`%${name}%`]);
    } else if (name === '') {
        res = await db.query('SELECT * FROM aliados a JOIN tipos_de_apoyo_a_brindar tdaab ON a.usuario_aliado = tdaab.usuario_aliado WHERE a.sector = $1 AND tdaab.tipo_apoyo = $2 AND a.estatus_activo = true', [sector, apoyo]);
    } else if (sector === '') {
        res = await db.query('SELECT * from ALIADOS a JOIN tipos_de_apoyo_a_brindar tdaab ON a.usuario_aliado = tdaab.usuario_aliado WHERE a.nombre LIKE $1 AND tdaab.tipo_apoyo = $2 AND a.estatus_activo = true', [`%${name}%`, apoyo]);
    } else if (apoyo === '') {
        res = await db.query('SELECT * FROM aliados WHERE nombre LIKE $1 AND sector = $2 AND estatus_activo = true', [`%${name}%`, sector])
    } else {
        res = await db.query('select * from aliados a join tipos_de_apoyo_a_brindar tdaab on a.usuario_aliado = tdaab.usuario_aliado where a.nombre like $1 and a.sector = $2 and tdaab.tipo_apoyo = $3 and a.estatus_activo = true', [`%${name}%`, sector, apoyo]);
    }
    
    // console.log(res.rows);
    return res.rows;
}

const getSectores = async () => {
    const res = await db.query('SELECT DISTINCT sector FROM aliados WHERE estatus_activo = true');
    console.log(res.rows);
    return res.rows;
}

module.exports = { getAllAliados, getAllActiveAliados, getApoyosByAliado, getDistinctApoyos, getFilteredAliados, getSectores }