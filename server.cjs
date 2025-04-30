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
const { mensajeRouter } = require('./Usuarios/mensaje_route.cjs');

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
app.use('/api', mensajeRouter);


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

/*app.post('/api/sesion/recuperar', async (req, res) => {
    const { name } = req.body;  // Recibe el nombre de usuario o correo desde el cuerpo de la solicitud

    try {
        console.log('Solicitud de recuperación recibida para:', name);

        // Aquí puedes agregar la lógica de recuperación de contraseña
        // Por ejemplo: Enviar un enlace de recuperación por correo o verificar si el usuario existe

        res.status(200).json({ message: 'Enlace de recuperación enviado' });
    } catch (error) {
        console.error('Error en la recuperación:', error);
        res.status(500).json({ message: 'Hubo un problema al intentar recuperar la contraseña' });
    }
});
*/
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
    res.status(status).send(err.message);
});