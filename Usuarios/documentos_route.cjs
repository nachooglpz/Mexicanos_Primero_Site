const express = require('express');
const router = express.Router();
const documentosModel = require('./documentos_model.cjs');

router.post('/', async (req, res) => {
    const { titulo, link, tipo_usuario, usuario } = req.body;

    if (!titulo || !link || !tipo_usuario || !usuario) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const result = await documentosModel.crearDocumento(titulo, link, tipo_usuario, usuario);
        res.status(201).json({ message: 'Documento creado exitosamente', documento: result });
    } catch (error) {
        console.error('Error al guardar el documento:', error);
        res.status(500).json({ error: 'Error al guardar el documento' });
    }
});

router.get('/:tipo_usuario/:usuario', async (req, res) => {
    const { tipo_usuario, usuario } = req.params;
    try {
        const documentos = await documentosModel.obtenerDocumentos(tipo_usuario, usuario);
        res.json(documentos);
    } catch (error) {
        console.error('Error al obtener documentos:', error);
        res.status(500).json({ error: 'Error al obtener documentos' });
    }
});

router.delete('/:tipo_usuario/:id', async (req, res) => {
    const { tipo_usuario, id } = req.params;
    try {
        const result = await documentosModel.eliminarDocumento(tipo_usuario, id);
        if (result) {
            res.json({ message: 'Documento eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Documento no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar documento:', error);
        res.status(500).json({ error: 'Error al eliminar documento' });
    }
});

module.exports = router;