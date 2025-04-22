const express = require('express');

const notificacionesRouter = express.Router();

const notificacionesModel = require('../models/notificaciones.cjs');

const validateEscuelasQuery = (req, res, next) => {
    if (!('usuario' in req.query)) {
        const error = new Error(`Query is missing usuario. Arguments: ${req.query}`);
        error.status = 401;
        return next(error);
    }

    next();
};

notificacionesRouter.get('/escuelas', validateEscuelasQuery, async (req, res, next) => {
    const { usuario } = req.query;
    const notis = await notificacionesModel.getNoficicacionesByEscuela(usuario);
    res.status(201).send(notis);
});

notificacionesRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { notificacionesRouter };