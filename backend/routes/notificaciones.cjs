const express = require('express');

const notificacionesRouter = express.Router();

const notificacionesModel = require('../models/notificaciones.cjs');

const validateUsuarioQuery = (req, res, next) => {
    if (!('usuario' in req.query)) {
        const error = new Error(`Query is missing usuario. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }

    next();
};

notificacionesRouter.get('/escuelas', validateUsuarioQuery, async (req, res, next) => {
    const { usuario } = req.query;
    console.log('Usuario recibido:', usuario);
    const notis = await notificacionesModel.getNoficicacionesByEscuela(usuario);
    res.send(notis);
});

notificacionesRouter.get('/aliados', validateUsuarioQuery, async (req, res, next) => {
    const { usuario } = req.query;
    const notis = await notificacionesModel.getNoficicacionesByAliado(usuario);
    res.send(notis);
});

notificacionesRouter.get('/admin', validateUsuarioQuery, async (req, res, next) => {
    const { usuario } = req.query;
    const notis = await notificacionesModel.getNoficicacionesByAdmin(usuario);
    res.send(notis);
});


notificacionesRouter.get('/aliados', async (req, res) => {
    const { usuario } = req.query;

    if (!usuario) {
        return res.status(400).json({ error: 'El parámetro usuario es obligatorio' });
    }

    console.log('Usuario recibido:', usuario);
    try {
        const notificaciones = await db.query('SELECT * FROM notificaciones WHERE usuario_aliado = $1', [usuario]);
        res.json(notificaciones.rows);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
});

notificacionesRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { notificacionesRouter };