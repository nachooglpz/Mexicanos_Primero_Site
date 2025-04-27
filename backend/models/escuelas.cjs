const db = require('../db.cjs');

const getEscuela = async (usuarioEscuela) => {
    const result = await db.query('SELECT * FROM administradores_de_escuela WHERE usuario_escuela = $1', [usuarioEscuela]);
    return result.rows;
}

const getAllEscuelas = async () => {
    const result = await db.query('SELECT * FROM administradores_de_escuela');
    return result.rows;
}

const getAllActiveEscuelas = async () => {
    const result = await db.query('SELECT * FROM administradores_de_escuela WHERE estatus_activo = true');
    return result.rows;
}

const getFilteredEscuelas = async (name, necesidad) => {
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

const agregarNecesidad = async (usuarioEscuela, necesidad) => {
    const result = await db.query('INSERT INTO necesidades (usuario_escuela, necesidad) VALUES ($1, $2)', [usuarioEscuela, necesidad]);
    return result.rows;
}

const modificarEscuela = async (usuarioEscuela, nombre, escuela, contrasena, email, direccion, cct) => {
    const result = await db.query('UPDATE administradores_de_escuela SET nombre = $1, escuela = $2, contrasena = $3, email = $4, direccion = $5, cct = $6 WHERE usuario_escuela = $7', [nombre, escuela, contrasena, email, direccion, cct, usuarioEscuela]);
    return result.rows;
}

const eliminarNecesidad = async (usuarioEscuela, necesidad) => {
    const result = await db.query('DELETE FROM necesidades WHERE usuario_escuela = $1 AND necesidad = $2', [usuarioEscuela, necesidad]);
    return result.rows;
}

const getDireccionesEscuelas = async () => {
    try {
        const result = await db.query('SELECT usuario_escuela, nombre, escuela, direccion FROM administradores_de_escuela WHERE estatus_activo = true');
        console.log('Direcciones obtenidas de la base de datos:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error en getDireccionesEscuelas:', error.message);
        throw error; // Lanza el error para que el endpoint lo capture
    }
};

module.exports = { getEscuela, getAllEscuelas, getAllActiveEscuelas, getFilteredEscuelas, getNecesidadesByEscuela, getDistinctNecesidades, agregarNecesidad, modificarEscuela, eliminarNecesidad, getDireccionesEscuelas }