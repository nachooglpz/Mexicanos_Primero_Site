const express = require('express');

const escuelasRouter = express.Router();

const escuelasModel = require('../models/escuelas.cjs');

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

escuelasRouter.get('/distinctNecesidades', async (req, res, next) => {
    const necesidades = await escuelasModel.getDistinctNecesidades();
    res.send(necesidades);
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

escuelasRouter.get('/direcciones', async (req, res) => {
    try {
        const direcciones = await escuelasModel.getDireccionesEscuelas();
        res.json(direcciones); // Envía las direcciones como JSON
    } catch (error) {
        console.error('Error al obtener direcciones de escuelas:', error);
        res.status(500).send('Error al obtener direcciones de escuelas');
    }
});

escuelasRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { escuelasRouter };