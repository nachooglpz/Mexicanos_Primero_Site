// Import and create app
const db = require('./db.cjs');
const express = require('express');
const app = express();
const cors = require('cors');


const { aliadosRouter } = require('./Usuarios/aliados_route.cjs');
const { escuelasRouter } = require('./Usuarios/escuelas_route.cjs');
const { adminRouter } = require('./Usuarios/admin_route.cjs');
const { notificacionesRouter } = require('./Comunicacion/notificaciones_route.cjs');
const documentosRouter = require('./Usuarios/documentos_route.cjs');
const { sesionRouter } = require('./Usuarios/sesion_registro_route.cjs');
const { convenioRouter } = require('./Match/Convenio/convenio_route.cjs');
const inicioSesionModel = require('./Usuarios/inicioSesion_model.cjs');
const { mensajeRouter } = require('./Usuarios/mensaje_route.cjs');
const { recuperarRouter } = require('./Usuarios/recuperar_route.cjs');

const PORT = process.env.PORT || 3000;

// Use static server to serve the Website
app.use(express.static('public'));

// Middleware para parsear JSON
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }));  
app.use(express.json());

// Routes go here
app.use('/api/aliados', aliadosRouter);
app.use('/api/escuelas', escuelasRouter);
app.use('/api/notificaciones', notificacionesRouter);
app.use('/api/admin', adminRouter);
app.use('/api/documentos', documentosRouter);
app.use('/api/sesion', sesionRouter);
app.use('/api/convenios', convenioRouter);
app.use('/api', mensajeRouter);
app.use('/api/recuperar', recuperarRouter)

// Login request middleware
const validateLoginQuery = (req, res, next) => {
    if (!('usuario' in req.query && 'contrasena' in req.query)) {
        const error = new Error(`Query is missing usuario or contrasena. Arguments: ${req.query}`);
        error.status = 401;
        return next(error);
    }
    next();
};

// Login endpoint
app.get('/api/login', validateLoginQuery, async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.query;
        const userInfo = await inicioSesionModel.getExistentUser(usuario, contrasena);
        res.status(201).send(userInfo);
    } catch (error) {
        console.error('Error en /api/login:', error);
        next(error);
    }
});

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    try {
        console.log('Ruta /api/usuarios llamada');

        // Obtén los datos de ambas tablas
        const administradores = await db.query('SELECT * FROM administradores_de_escuela');
        const aliados = await db.query('SELECT * FROM aliados');

        // Agrega el rol a cada registro
        const administradoresConRol = administradores.rows.map((admin) => ({
            ...admin,
            rol: 'Administrador de Escuela',
        }));

        const aliadosConRol = aliados.rows.map((aliado) => ({
            ...aliado,
            rol: 'Aliado',
        }));

        // Combina los datos
        const usuarios = [...administradoresConRol, ...aliadosConRol];

        console.log('Usuarios enviados:', usuarios); // Verifica que el rol esté presente
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
});

app.get('/api/mensaje', (req, res) => {
    const user = req.query.user; // Aquí recibes el parámetro de la URL
    const caracteres = 'ABC123';
    let token = '';
    for (let i = 0; i < caracteres.length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      token += caracteres[randomIndex];
    }
    res.json({ 
        user: user,
        token: token,

     });
  });
// Start the server listening on PORT
app.listen(PORT, () => {
    console.log(`The server is listening for requests on port ${PORT}`);
});


app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.error('Error:', err.message);
    res.status(status).send(err.message);
});