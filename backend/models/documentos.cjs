const db = require('../db.cjs');

// Función para insertar un nuevo documento
const crearDocumento = async (titulo, link) => {
    return db.query('INSERT INTO documentos (titulo, link) VALUES ($1, $2)', [titulo, link]);
};

// Función para obtener todos los documentos
const obtenerDocumentos = async () => {
    const result = await db.query('SELECT * FROM documentos ORDER BY fecha_subida DESC');
    return result.rows;
};

// Función para eliminar un documento por su ID
const eliminarDocumento = async (id_documento) => {
    return db.query('DELETE FROM documentos WHERE id_documento = $1', [id_documento]);
};

module.exports = { crearDocumento, obtenerDocumentos, eliminarDocumento };