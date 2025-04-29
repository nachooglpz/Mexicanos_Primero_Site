const db = require('../db.cjs');

const crearDocumento = async (titulo, link, tipo_usuario, usuario) => {
    try {
        console.log('Insertando documento base:', { titulo, link });
        
        // Insert into documentos table
        const docResult = await db.query(
            'INSERT INTO documentos (titulo, link, fecha_subida) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING id_documento',
            [titulo, link]
        );

        const id_documento = docResult.rows[0].id_documento;
        console.log('ID del documento creado:', id_documento);

        // Determine target table and column
        let tabla, columnaUsuario;
        switch(tipo_usuario) {
            case 'aliado':
                tabla = 'documentos_aliados';
                columnaUsuario = 'usuario_aliado';
                break;
            case 'escuela':
                tabla = 'documentos_escuelas';
                columnaUsuario = 'usuario_escuela';
                break;
            case 'admin':
                tabla = 'documentos_admin';
                columnaUsuario = 'usuario_admin';
                break;
            default:
                throw new Error(`Tipo de usuario no válido: ${tipo_usuario}`);
        }

        // Insert into specific user table
        console.log('Insertando en tabla específica:', { tabla, columnaUsuario, usuario });
        await db.query(
            `INSERT INTO ${tabla} (id_documento, ${columnaUsuario}) VALUES ($1, $2)`,
            [id_documento, usuario]
        );

        console.log('Documento creado exitosamente');
        return { id_documento, titulo, link };
    } catch (error) {
        console.error('Error en crearDocumento:', error);
        throw error;
    }
};

const obtenerDocumentos = async (tipo_usuario, usuario) => {
    try {
        let tabla, columnaUsuario;
        
        switch(tipo_usuario) {
            case 'aliado':
                tabla = 'documentos_aliados';
                columnaUsuario = 'usuario_aliado';
                break;
            case 'escuela':
                tabla = 'documentos_escuelas';
                columnaUsuario = 'usuario_escuela';
                break;
            case 'admin':
                tabla = 'documentos_admin';
                columnaUsuario = 'usuario_admin';
                break;
            default:
                throw new Error('Tipo de usuario no válido');
        }

        const result = await db.query(
            `SELECT d.id_documento, d.titulo, d.link, d.fecha_subida
             FROM documentos d
             JOIN ${tabla} ud ON d.id_documento = ud.id_documento
             WHERE ud.${columnaUsuario} = $1
             ORDER BY d.fecha_subida DESC`,
            [usuario]
        );

        return result.rows;
    } catch (error) {
        console.error('Error en obtenerDocumentos:', error);
        throw error;
    }
};

const eliminarDocumento = async (tipo_usuario, id_documento) => {
    try {
        // Delete from main table will cascade to relationship tables
        const result = await db.query(
            'DELETE FROM documentos WHERE id_documento = $1',
            [id_documento]
        );
        return result.rowCount > 0;
    } catch (error) {
        console.error('Error en eliminarDocumento:', error);
        throw error;
    }
};

module.exports = { crearDocumento, obtenerDocumentos, eliminarDocumento };