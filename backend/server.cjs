// Import and create app
const db = require('./db.cjs');
const express = require('express');
const app = express();

const { aliadosRouter } = require('./routes/aliados.cjs');
const { escuelasRouter } = require('./routes/escuelas.cjs');
const { notificacionesRouter } = require('./routes/notificaciones.cjs');
const documentosRouter = require('./routes/documentos.cjs');

const PORT = process.env.PORT || 3000;

// Use static server to serve the Website
app.use(express.static('public'));

// Middleware para parsear JSON
app.use(express.json());


// Routes go here
app.use('/api/aliados', aliadosRouter);
app.use('/api/escuelas', escuelasRouter);
app.use('/api/notificaciones', notificacionesRouter);
app.use('/api/documentos', documentosRouter);

//ruta para obtener todos los usuarios 
app.get('/api/usuarios', async (req, res) => {
    try {
        console.log('Ruta /api/usuarios llamada');
        
        // Obtén los datos de ambas tablas
        const administradores = await db.query('SELECT * FROM administradores_de_escuela');
        const aliados = await db.query('SELECT * FROM aliados');

        // Agrega el rol a cada registro
        const administradoresConRol = administradores.rows.map((admin) => ({
            ...admin,
            rol: 'Administrador de Escuela'
        }));

        const aliadosConRol = aliados.rows.map((aliado) => ({
            ...aliado,
            rol: 'Aliado'
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

// Start the server listening on PORT
app.listen(PORT, () => {
    console.log(`The server is listening for requests on port ${PORT}`);
});