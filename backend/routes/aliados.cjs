const express = require('express');

const aliadosRouter = express.Router();

const aliadosModel = require('../models/aliados.cjs');

// Middleware
const validateApoyoQuery = (req, res, next) => {
    if (!('usuario_aliado' in req.query)) {
        const error = new Error(`Query is missing usuario_aliado. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validateFilteredAliadosQuery = (req, res, next) => {
    if (!('name' in req.query)|| !('sector' in req.query) || !('apoyo' in req.query)) {
        const error = new Error(`Query is missing name, sector, or apoyo. Arguments: ${req.query}`);
        error.status = 401;
        return next(error);
    }
    next();
};

aliadosRouter.get('/', async (req, res, next) => {
    const dbAliados = await aliadosModel.getAllActiveAliados();
    res.send(dbAliados);
});

aliadosRouter.get('/filtered', validateFilteredAliadosQuery, async (req, res, next) => {
    const { name, sector, apoyo } = req.query;
    const dbAliados = await aliadosModel.getFilteredAliados(name, sector, apoyo);
    res.send(dbAliados);
});

aliadosRouter.get('/apoyos', validateApoyoQuery, async (req, res, next) => {
    const { usuario_aliado } = req.query;
    const dbApoyos = await aliadosModel.getApoyosByAliado(usuario_aliado);
    res.send(dbApoyos);
});

aliadosRouter.get('/distinctApoyos', async (req, res, next) => {
    const apoyos = await aliadosModel.getDistinctApoyos();
    res.send(apoyos);
});

aliadosRouter.get('/sectores', async (req, res, next) => {
    const sectores = await aliadosModel.getSectores();
    res.send(sectores);
});

aliadosRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { aliadosRouter };