const db = require('../db.cjs');

const getAllEscuelas = async () => {
    const result = await db.query('SELECT * FROM administradores_de_escuela');
    return result.rows;
}

const getAllActiveEscuelas = async () => {
    const result = await db.query('SELECT * FROM administradores_de_escuela WHERE estatus_activo = true');
    return result.rows;
}

getFilteredEscuelas = async (name, necesidad) => {
    let result;
    if (name === '' && necesidad === '') {
        result = await db.query('SELECT * FROM administradores_de_escuela WHERE estatus_activo = true');
    } else if (name === '') {
        result = await db.query('SELECT * FROM administradores_de_escuela ade JOIN necesidades n ON ade.usuario_escuela = n.usuario_escuela WHERE n.necesidad = $1 AND ade.estatus_activo = true', [necesidad]);
    } else if (necesidad === '') {
        result = await db.query('SELECT * FROM administradores_de_escuela ade WHERE (UPPER(nombre) LIKE UPPER($1) OR UPPER(escuela) LIKE UPPER($1)) AND estatus_activo = true', [`%${name}%`]);
    } else {
        result = await db.query('SELECT * FROM administradores_de_escuela ade JOIN necesidades n ON ade.usuario_escuela = n.usuario_escuela WHERE (UPPER(ade.nombre) LIKE UPPER($1) OR UPPER(ade.escuela) LIKE UPPER($1)) AND n.necesidad = $2 AND ade.estatus_activo = true', [`%${name}%`, necesidad]);
    }
    return result.rows;
};

const getNecesidadesByEscuela = async (escuela) => {
    const result = await db.query('SELECT DISTINCT necesidad FROM necesidades WHERE usuario_escuela = $1', [escuela]);
    return result.rows;
}

const getDistinctNecesidades = async () => {
    const result = await db.query('SELECT DISTINCT necesidad FROM necesidades n JOIN administradores_de_escuela ade ON ade.usuario_escuela = n.usuario_escuela WHERE ade.estatus_activo = true ORDER BY necesidad ASC')
    return result.rows;
}

module.exports = { getAllEscuelas, getAllActiveEscuelas, getFilteredEscuelas, getNecesidadesByEscuela, getDistinctNecesidades }