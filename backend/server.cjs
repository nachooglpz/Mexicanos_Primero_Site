// Import and create app
const express = require('express');
const app = express();

const { testRouter } = require('./routes/test.cjs');
const { aliadosRouter } = require('./routes/aliados.cjs')

const PORT = process.env.PORT || 3000;

// Use static server to serve the Website
app.use(express.static('public'));

// Routes go here
app.use('/api', testRouter);
app.use('/api/aliados', aliadosRouter);

// Start the server listening on PORT
app.listen(PORT, () => {
    console.log(`The server is listening for requests on port ${PORT}`);
});