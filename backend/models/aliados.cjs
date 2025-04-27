const db = require('../db.cjs');

const getAliado = async (usuarioAliado) => {
    const res = await db.query('SELECT * FROM aliados WHERE usuario_aliado = $1', [usuarioAliado]);
    // console.log(res.rows);
    return res.rows;
}

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
    // console.log(res.rows);
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
        res = await db.query('SELECT * FROM aliados WHERE (UPPER(nombre) LIKE UPPER($1) OR UPPER(empresa) LIKE UPPER($1) OR UPPER(sector) LIKE UPPER($1)) AND estatus_activo = true', [`%${name}%`]);
    } else if (name === '') {
        res = await db.query('SELECT * FROM aliados a JOIN tipos_de_apoyo_a_brindar tdaab ON a.usuario_aliado = tdaab.usuario_aliado WHERE a.sector = $1 AND tdaab.tipo_apoyo = $2 AND a.estatus_activo = true', [sector, apoyo]);
    } else if (sector === '') {
        res = await db.query('SELECT * from ALIADOS a JOIN tipos_de_apoyo_a_brindar tdaab ON a.usuario_aliado = tdaab.usuario_aliado WHERE (UPPER(a.nombre) LIKE UPPER($1) OR UPPER(a.empresa) LIKE UPPER($1) OR UPPER(a.sector) LIKE UPPER($1)) AND tdaab.tipo_apoyo = $2 AND a.estatus_activo = true', [`%${name}%`, apoyo]);
    } else if (apoyo === '') {
        res = await db.query('SELECT * FROM aliados WHERE (UPPER(nombre) LIKE UPPER($1) OR UPPER(empresa) LIKE UPPER($1) OR UPPER(sector) LIKE UPPER($1)) AND sector = $2 AND estatus_activo = true', [`%${name}%`, sector])
    } else {
        res = await db.query('select * from aliados a join tipos_de_apoyo_a_brindar tdaab on a.usuario_aliado = tdaab.usuario_aliado where (UPPER(a.nombre) like UPPER($1) or UPPER(a.empresa) LIKE UPPER($1) OR UPPER(a.sector) LIKE UPPER($1)) and a.sector = $2 and tdaab.tipo_apoyo = $3 and a.estatus_activo = true', [`%${name}%`, sector, apoyo]);
    }
    
    // console.log(res.rows);
    return res.rows;
}

const getSectores = async () => {
    const res = await db.query('SELECT DISTINCT sector FROM aliados WHERE estatus_activo = true');
    // console.log(res.rows);
    return res.rows;
}

const agregarApoyo = async (usuarioAliado, tipoApoyo) => {
    console.log('agregando: ', usuarioAliado, tipoApoyo);
    const res = await db.query('INSERT INTO tipos_de_apoyo_a_brindar (usuario_aliado, tipo_apoyo) VALUES ($1, $2)', [usuarioAliado, tipoApoyo]);
    return res.rows;
}

const modificarAliado = async (usuarioAliado, nombre, email, contrasena, empresa, sector, direccion) => {
    const res = await db.query('UPDATE aliados SET nombre = $1, email = $2, contrasena = $3, empresa = $4, sector = $5, direccion = $6 WHERE usuario_aliado = $7', [nombre, email, contrasena, empresa, sector, direccion, usuarioAliado]);
    return res.rows;
}

const eliminarApoyo = async (usuarioAliado, tipoApoyo) => {
    console.log('eliminando: ', usuarioAliado, tipoApoyo);
    const res = await db.query('DELETE FROM tipos_de_apoyo_a_brindar WHERE usuario_aliado = $1 AND tipo_apoyo = $2', [usuarioAliado, tipoApoyo]);
    return res.rows;
}

const getDireccionesAliados = async () => {
    const res = await db.query('SELECT usuario_aliado, nombre, empresa, direccion FROM aliados WHERE estatus_activo = true');
    // console.log(res.rows);
    return res.rows;
};
module.exports = { getAliado, getAllAliados, getAllActiveAliados, getApoyosByAliado, getDistinctApoyos, getFilteredAliados, getSectores, agregarApoyo, modificarAliado, eliminarApoyo, getDireccionesAliados }