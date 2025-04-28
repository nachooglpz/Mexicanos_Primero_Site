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

const buscarAliadosPorNecesidad = async (necesidad) => {
    try {
        // Buscar aliados que coincidan con la necesidad
        const result = await db.query(
            'SELECT usuario_aliado FROM tipos_de_apoyo_a_brindar WHERE tipo_apoyo = $1',
            [necesidad]
        );
        return result.rows; // Devuelve los aliados que coinciden
    } catch (error) {
        console.error('Error al buscar aliados por necesidad:', error.message);
        throw error; // Lanza el error para que el endpoint lo capture
    }
};

const generarNotificacionesPorCoincidencias = async () => {
    try {
        // Paso 1: Obtener todas las necesidades
        const necesidades = await db.query('SELECT usuario_escuela, necesidad FROM necesidades');
        
        // Paso 2: Iterar sobre cada necesidad y buscar coincidencias
        for (const necesidad of necesidades.rows) {
            const { usuario_escuela, necesidad: tipoNecesidad } = necesidad;

            // Buscar aliados que coincidan con la necesidad
            const aliados = await db.query(
                'SELECT usuario_aliado FROM tipos_de_apoyo_a_brindar WHERE tipo_apoyo = $1',
                [tipoNecesidad]
            );

            if (aliados.rows.length > 0) {
                // Paso 3: Insertar una notificación
                const notificacion = await db.query(
                    'INSERT INTO notificaciones (titulo, texto) VALUES ($1, $2) RETURNING id_notificacion',
                    ['Nueva coincidencia', `Se ha encontrado un aliado que puede ayudar con la necesidad: ${tipoNecesidad}.`]
                );

                // Paso 4: Asignar la notificación a la escuela
                await db.query(
                    'INSERT INTO notificaciones_a_administradores_de_escuelas (id_notificacion, usuario_escuela) VALUES ($1, $2)',
                    [notificacion.rows[0].id_notificacion, usuario_escuela]
                );
            }
        }
    } catch (error) {
        console.error('Error al generar notificaciones por coincidencias:', error.message);
        throw error;
    }
};

const verificarCoincidencias = async () => {
    try {
        const result = await db.query(`
            SELECT DISTINCT
                n.usuario_escuela,
                n.necesidad,
                t.usuario_aliado,
                t.tipo_apoyo,
                ade.escuela,
                ade.email as email_escuela,
                ade.direccion as direccion_escuela,
                a.empresa,
                a.email as email_aliado,
                a.direccion as direccion_aliado
            FROM necesidades n
            INNER JOIN tipos_de_apoyo_a_brindar t ON n.necesidad = t.tipo_apoyo
            INNER JOIN administradores_de_escuela ade ON n.usuario_escuela = ade.usuario_escuela
            INNER JOIN aliados a ON t.usuario_aliado = a.usuario_aliado
        `);

        // Create notifications for each match
        for (const match of result.rows) {
            // Create notification for school
            const notificacionEscuela = await db.query(
                'INSERT INTO notificaciones (titulo, texto) VALUES ($1, $2) RETURNING id_notificacion',
                [
                    '¡Nuevo Match!',
                    `¡Has hecho match en: ${match.necesidad}!\n\nDatos del Aliado:\n• Empresa: ${match.empresa}\n• Correo: ${match.email_aliado}\n• Dirección: ${match.direccion_aliado}`
                ]
            );

            // Create notification for ally
            const notificacionAliado = await db.query(
                'INSERT INTO notificaciones (titulo, texto) VALUES ($1, $2) RETURNING id_notificacion',
                [
                    '¡Nuevo Match!',
                    `¡Has hecho match en: ${match.tipo_apoyo}!\n\nDatos de la Escuela:\n• Nombre: ${match.escuela}\n• Correo: ${match.email_escuela}\n• Dirección: ${match.direccion_escuela}`
                ]
            );

            // Assign notifications to school and ally
            await db.query(
                'INSERT INTO notificaciones_a_administradores_de_escuelas (id_notificacion, usuario_escuela) VALUES ($1, $2)',
                [notificacionEscuela.rows[0].id_notificacion, match.usuario_escuela]
            );

            await db.query(
                'INSERT INTO notificaciones_a_aliados (id_notificacion, usuario_aliado) VALUES ($1, $2)',
                [notificacionAliado.rows[0].id_notificacion, match.usuario_aliado]
            );
        }

        return result.rows;
    } catch (error) {
        console.error('Error en verificarCoincidencias:', error);
        throw error;
    }
};

const verificarNotificaciones = async () => {
    try {
        // Primero, verificamos si hay notificaciones en general
        const countResult = await db.query('SELECT COUNT(*) FROM notificaciones');
        console.log('Total de notificaciones:', countResult.rows[0].count);

        // Consulta simplificada para debug
        const result = await db.query(`
            SELECT 
                n.id_notificacion,
                n.titulo,
                n.texto,
                COALESCE(e.usuario_escuela, a.usuario_aliado) as usuario,
                CASE 
                    WHEN e.usuario_escuela IS NOT NULL THEN 'escuela'
                    WHEN a.usuario_aliado IS NOT NULL THEN 'aliado'
                END as tipo_usuario
            FROM notificaciones n
            LEFT JOIN notificaciones_a_administradores_de_escuelas e 
                ON n.id_notificacion = e.id_notificacion
            LEFT JOIN notificaciones_a_aliados a 
                ON n.id_notificacion = a.id_notificacion
            WHERE n.titulo LIKE '%Match%' OR n.titulo LIKE '%coincidencia%'
            ORDER BY n.id_notificacion DESC
        `);
        
        console.log('Notificaciones encontradas:', result.rows.length);
        
        if (result.rows.length === 0) {
            // Verificar si hay coincidencias potenciales
            const potentialMatches = await db.query(`
                SELECT COUNT(*) 
                FROM necesidades n
                INNER JOIN tipos_de_apoyo_a_brindar t 
                ON n.necesidad = t.tipo_apoyo
            `);
            console.log('Coincidencias potenciales:', potentialMatches.rows[0].count);
        }

        return result.rows;
    } catch (error) {
        console.error('Error detallado al verificar notificaciones:', error);
        throw error;
    }
};

module.exports = { getEscuela, getAllEscuelas, getAllActiveEscuelas, getFilteredEscuelas, getNecesidadesByEscuela, getDistinctNecesidades, agregarNecesidad, modificarEscuela, eliminarNecesidad, getDireccionesEscuelas, buscarAliadosPorNecesidad, generarNotificacionesPorCoincidencias, verificarCoincidencias, verificarNotificaciones }