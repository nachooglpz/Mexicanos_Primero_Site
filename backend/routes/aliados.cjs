const express = require('express');

const aliadosRouter = express.Router();

const aliadosModel = require('../models/aliados.cjs');

// Middleware
const validateAliadoQuery = (req, res, next) => {
    if (!('usuario_aliado' in req.query)) {
        const error = new Error(`Query is missing usuario_aliado. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

const validateApoyoQuery = (req, res, next) => {
    if (!('usuario_aliado' in req.query)) {
        const error = new Error(`Query is missing usuario_aliado. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validateApoyoPostDelete = (req, res, next) => {
    if (!('usuario_aliado' in req.query && 'apoyo' in req.query)) {
        const error = new Error(`Query is missing usuario_aliado or apoyo. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

const validateFilteredAliadosQuery = (req, res, next) => {
    if (!('name' in req.query && 'sector' in req.query && 'apoyo' in req.query)) {
        const error = new Error(`Query is missing name, sector, or apoyo. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validatePutQuery = (req, res, next) => {
    if (!('usuario_aliado' in req.query && 'nombre' in req.query && 'email' in req.query && 'contrasena' in req.query && 'empresa' in req.query && 'sector' in req.query && 'direccion' in req.query)) {
        const error = new Error(`Query is missing usuario_aliado, nombre, email, contrasena, empresa, sector, or direccion. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

aliadosRouter.get('/', async (req, res, next) => {
    const dbAliados = await aliadosModel.getAllActiveAliados();
    res.send(dbAliados);
});

aliadosRouter.get('/aliado', async (req, res, next) => {
    const dbAliado = await aliadosModel.getAliado(req.query.usuario_aliado);
    res.send(dbAliado);
})

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

aliadosRouter.post('/apoyo', validateApoyoPostDelete, async (req, res, next) => {
    console.log('Body recibido:', req.query);
    const {usuario_aliado, apoyo } = req.query;
    const posted = await aliadosModel.agregarApoyo(usuario_aliado, apoyo);
    res.status(201).send(posted);
});

aliadosRouter.put('/edit', validatePutQuery, async (req, res, next) => {
    const {usuario_aliado, nombre, email, contrasena, empresa, sector, direccion} = req.query;
    const updated = await aliadosModel.modificarAliado(usuario_aliado, nombre, email, contrasena, empresa, sector, direccion);
    res.status(200).send(updated);
});

aliadosRouter.delete('/apoyo', validateApoyoPostDelete, async (req, res, next) => {
    console.log('Body recibido:', req.query);
    const {usuario_aliado, apoyo } = req.query;
    const deleted = await aliadosModel.eliminarApoyo(usuario_aliado, apoyo);
    res.status(204).send(deleted);
});

aliadosRouter.get('/direcciones', async (req, res, next) => {
    try {
        const direcciones = await aliadosModel.getDireccionesAliados();
        console.log(direcciones); // Verifica que las direcciones se obtengan correctamente
        res.json(direcciones); // Envía las direcciones como JSON
    } catch (error) {
        console.error('Error al obtener direcciones de aliados:', error);
        res.status(500).send('Error al obtener direcciones de aliados');
    }
});

aliadosRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { aliadosRouter };