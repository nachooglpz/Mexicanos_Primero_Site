// Import and create app
const express = require('express');
const app = express();

const { aliadosRouter } = require('./Usuario/aliados_routes.cjs');
const { escuelasRouter } = require('./Usuario/escuelas_routes.cjs');
const { adminRouter } = require('./Usuario/admin_routes.cjs');
const { notificacionesRouter } = require('./Comunicacion/notificaciones_routes.cjs');

const inicioSesionModel = require('./Usuario/inicioSesion_model.cjs');

const PORT = process.env.PORT || 3000;

// Use static server to serve the Website
app.use(express.static('public'));

// Routes go here
app.use('/api/aliados', aliadosRouter);
app.use('/api/escuelas', escuelasRouter);
app.use('/api/notificaciones', notificacionesRouter);
app.use('/api/admin', adminRouter);

// Login request
const validateLoginQuery = (req, res, next) => {
    if (!('usuario' in req.query && 'contrasena' in req.query)) {
        const error = new Error(`Query is missing usuario or contrasena. Arguments: ${req.query}`);
        error.status = 401;
        return next(error);
    }
    next();
};

app.get('/api/login', validateLoginQuery, async (req, res, next) => {
    const { usuario, contrasena } = req.query;
    const userInfo = await inicioSesionModel.getExistentUser(usuario, contrasena);
    res.status(201).send(userInfo);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

// Start the server listening on PORT
app.listen(PORT, () => {
    console.log(`The server is listening for requests on port ${PORT}`);
});