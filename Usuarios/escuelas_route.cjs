const express = require('express');

const escuelasRouter = express.Router();

const escuelasModel = require('./escuelas_model.cjs');
const { buscarAliadosPorNecesidad } = require('./escuelas_model.cjs');

// Middleware
const validateFilteredEscuelasQuery = (req, res, next) => {
    if (!('keyWord' in req.query && 'necesidad' in req.query)) {
        const error = new Error(`Query is missing name or necesidad. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validateNecesidadesQuery = (req, res, next) => {
    if (!('usuario' in req.query)) {
        const error = new Error(`Query is missing usuario. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validateNecesidadPostDelete = (req, res, next) => {
    if (!('usuario_escuela' in req.query && 'necesidad' in req.query)) {
        const error = new Error(`Query is missing usuario_escuela or necesidad. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validatePutQuery = (req, res, next) => {
    if (!('usuario_escuela' in req.query && 'nombre' in req.query && 'escuela' in req.query && 'contrasena' in req.query && 'email' in req.query && 'direccion' in req.query && 'cct' in req.query)) {
        const error = new Error(`Query is missing usuario_escuela, nombre, escuela, contrasena, email, direccion, or cct. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

escuelasRouter.get('/', async (req, res, next) => {
    const dbEscuelas = await escuelasModel.getAllActiveEscuelas();
    res.send(dbEscuelas);
});

escuelasRouter.get('/escuela', validateNecesidadesQuery, async (req, res, next) => {
    const { usuario } = req.query;
    const dbEscuela = await escuelasModel.getEscuela(usuario);
    res.send(dbEscuela);
});

escuelasRouter.get('/filtered', validateFilteredEscuelasQuery, async (req, res, next) => {
    const { keyWord, necesidad } = req.query;
    const dbEscuelas = await escuelasModel.getFilteredEscuelas(keyWord, necesidad);
    res.send(dbEscuelas);
});

escuelasRouter.get('/necesidades', validateNecesidadesQuery, async (req, res, next) => {
    const { usuario } = req.query;
    const necesidades = await escuelasModel.getNecesidadesByEscuela(usuario);
    res.send(necesidades);
});

escuelasRouter.get('/distinctNecesidades', async (req, res, next) => {
    const necesidades = await escuelasModel.getDistinctNecesidades();
    res.send(necesidades);
});

escuelasRouter.post('/necesidad', validateNecesidadPostDelete, async (req, res, next) => {
    const { usuario_escuela, necesidad } = req.query;
    const posted = await escuelasModel.agregarNecesidad(usuario_escuela, necesidad);
    res.status(201).send(posted);
});

escuelasRouter.put('/edit', validatePutQuery, async (req, res, next) => {
    const { usuario_escuela, nombre, escuela, contrasena, email, direccion, cct } = req.query;
    const updated = await escuelasModel.modificarEscuela(usuario_escuela, nombre, escuela, contrasena, email, direccion, cct);
    res.status(200).send(updated);
});

escuelasRouter.delete('/necesidad', validateNecesidadPostDelete, async (req, res, next) => {
    const { usuario_escuela, necesidad } = req.query;
    const deleted = await escuelasModel.eliminarNecesidad(usuario_escuela, necesidad);
    res.status(204).send(deleted);
});

escuelasRouter.get('/direcciones', async (req, res) => {
    try {
        const direcciones = await escuelasModel.getDireccionesEscuelas();
        res.json(direcciones); // Envía las direcciones como JSON
    } catch (error) {
        console.error('Error al obtener direcciones de escuelas:', error);
        res.status(500).send('Error al obtener direcciones de escuelas');
    }
});

escuelasRouter.get('/verificar-coincidencias', async (req, res) => {
    try {
        const coincidencias = await escuelasModel.verificarCoincidencias();
        console.log('Route received coincidencias:', {
            count: coincidencias?.length,
            hasData: !!coincidencias
        });

        if (coincidencias && coincidencias.length > 0) {
            res.status(200).json({
                message: 'Se encontraron coincidencias y se generaron notificaciones',
                matches: coincidencias
            });
        } else {
            res.status(200).json({
                message: 'No se encontraron coincidencias',
                matches: [],
                debug: 'No matches found in database'
            });
        }
    } catch (error) {
        console.error('Detailed route error:', {
            message: error.message,
            stack: error.stack
        });
        
        res.status(500).json({
            message: 'Error al verificar coincidencias',
            error: error.message,
            details: 'Check server logs for more information'
        });
    }
});

escuelasRouter.get('/verificar-notificaciones', async (req, res) => {
    try {
        const notificaciones = await escuelasModel.verificarNotificaciones();
        res.status(200).json({
            message: notificaciones.length > 0 ? 
                'Notificaciones encontradas' : 
                'No se encontraron notificaciones de match',
            count: notificaciones.length,
            notificaciones: notificaciones
        });
    } catch (error) {
        console.error('Error detallado al verificar notificaciones:', error);
        res.status(500).json({
            message: 'Error al verificar notificaciones',
            error: error.message
        });
    }
});

escuelasRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { escuelasRouter };