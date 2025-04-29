const inicioSesionModel = require('./inicioSesion_model.cjs');
const express = require("express");

const sesionRouter = express.Router();

const validateLoginQuery = (req, res, next) => {
    if (!('usuario' in req.query && 'contrasena' in req.query)) {
        const error = new Error(`Query is missing usuario or contrasena. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validateAliadoQuery = (req, res, next) => {
    if(!(('nombre' && 'usuario' && 'contrasena' && 'correo' && 'empresa' && 'sector' && 'direccion') in req.query)) {
        const error = new Error(`Query is missing nombre, usuario, contraseña, correo, empresa, sector or dirección. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

const validateEscuelaQuery = (req, res, next) => {
    if(!(('nombre' && 'usuario' && 'contrasena' && 'correo' && 'escuela' && 'cct' && 'direccion') in req.query)) {
        const error = new Error(`Query is missing nombre, usuario, contraseña, correo, escuela, cct or dirección. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

sesionRouter.get('/login', validateLoginQuery, async (req, res, next) => {
    const { usuario, contrasena } = req.query;
    const userInfo = await inicioSesionModel.getExistentUser(usuario, contrasena);
    res.send(userInfo);
});

sesionRouter.post('/aliado', validateAliadoQuery, async (req, res, next) => {
    console.log('post aliado', req.query);
    const { nombre, usuario, contrasena, correo, empresa, sector, direccion } = req.query;
    const result = await inicioSesionModel.registerAliado(nombre, usuario, contrasena, correo, empresa, sector, direccion);
    res.status(201).send(result);
});

sesionRouter.post('/escuela', validateEscuelaQuery, (req, res, next) => {
    const { nombre, usuario, contrasena, correo, escuela, cct, direccion } = req.query;
    const result = inicioSesionModel.registerEscuela(nombre, usuario, contrasena, correo, escuela, cct, direccion);
    res.status(201).send(result);
});

sesionRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { sesionRouter };