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


notificacionesRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.send(err.message);
});

module.exports = { notificacionesRouter };