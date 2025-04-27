const express = require('express');

const adminRouter = express.Router();

const adminModel = require('./admin_models.cjs');

// Middleware
const validateAdminQuery = (req, res, next) => {
    if (!('usuario_admin' in req.query)) {
        const error = new Error(`Query is missing usuario_admin. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

const validatePutQuery = (req, res, next) => {
    if (!('usuario_admin' in req.query && 'nombre' in req.query && 'email' in req.query && 'contrasena' in req.query)) {
        const error = new Error(`Query is missing usuario_admin, nombre, email, or contrasena. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

adminRouter.get('/admin', validateAdminQuery, async (req, res, next) => {
    const { usuario_admin } = req.query;
    const dbAdmin = await adminModel.getAdmin(usuario_admin);
    res.send(dbAdmin);
});

adminRouter.put('/edit', validatePutQuery, async (req, res, next) => {
    const { usuario_admin, nombre, email, contrasena } = req.query;
    const dbAdmin = await adminModel.modificarAdmin(usuario_admin, nombre, email, contrasena);
    res.status(201).send(dbAdmin);
});

adminRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { adminRouter };