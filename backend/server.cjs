// Import and create app
const express = require('express');
const app = express();

const { aliadosRouter } = require('./routes/aliados.cjs');
const { escuelasRouter } = require('./routes/escuelas.cjs');

const PORT = process.env.PORT || 3000;

// Use static server to serve the Website
app.use(express.static('public'));

// Routes go here
app.use('/api/aliados', aliadosRouter);
app.use('/api/escuelas', escuelasRouter);

// Start the server listening on PORT
app.listen(PORT, () => {
    console.log(`The server is listening for requests on port ${PORT}`);
});