const express = require('express');
const router = express.Router();
const db = require('../db.cjs'); // Asegúrate de que este archivo maneje la conexión a la base de datos

// Endpoint para guardar un documento
router.post('/', async (req, res) => {
    const { titulo, link } = req.body;

    console.log('Datos recibidos en el servidor:', { titulo, link }); // Log para verificar los datos

    if (!titulo || !link) {
        console.log('Faltan datos en la solicitud');
        return res.status(400).json({ error: 'El título y el link son obligatorios' });
    }

    try {
        const result = await db.query('INSERT INTO documentos (titulo, link) VALUES ($1, $2)', [titulo, link]);
        console.log('Documento guardado en la base de datos:', result);
        res.status(201).json({ message: 'Documento creado exitosamente' });
    } catch (error) {
        console.error('Error al guardar el documento:', error);
        res.status(500).json({ error: 'Error al guardar el documento' });
    }
});

// Endpoint para obtener todos los documentos
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM documentos');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener los documentos:', error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
});

// Endpoint para eliminar un documento
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM documentos WHERE id_documento = $1', [id]);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Documento eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el documento:', error);
        res.status(500).json({ error: 'Error al eliminar el documento' });
    }
});

module.exports = router;