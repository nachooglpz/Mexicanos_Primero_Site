const express = require('express');

const convenioRouter = express.Router();

const convenioModel = require('./convenio_model.cjs');

// Middleware
const validateCreateConvenioQuery = (req, res, next) => {
    if (!(('usuario_aliado' && 'usuario_escuela' && 'fechaInicio') in req.body)) {
        const error = new Error(`Query is missing usuario_aliado, usuario_escuela or fechaInicio. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validateUsuarioQuery = (req, res, next) => {
    if (!('usuario' in req.query)) {
        const error = new Error(`Query is missing usuario. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
};

const validateLinkContratoQuery = (req, res, next) => {
    if (!('id_convenio' in req.body && 'link_contrato' in req.body)) {
        const error = new Error(`Query is missing id_convenio or link_contrato. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

const validateLinkChatQuery = (req, res, next) => {
    if (!('id_convenio' in req.body && 'link_chat' in req.body)) {
        const error = new Error(`Query is missing id_convenio or link_chat. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

const validateFirmaQuery = (req, res, next) => {
    if (!('id_convenio' in req.body)) {
        const error = new Error(`Query is missing id_convenio. Arguments: ${req.query}`);
        error.status = 400;
        return next(error);
    }
    next();
}

// Requests
convenioRouter.post('/', validateCreateConvenioQuery, async (req, res, next) => {
    const { usuario_aliado, usuario_escuela, fechaInicio } = req.body;
    const dbConvenio = await convenioModel.createConvenio(usuario_aliado, usuario_escuela, fechaInicio);
    res.send(dbConvenio);
});

convenioRouter.get('/aliado', validateUsuarioQuery, async (req, res, next) => {
    const { usuario } = req.query;
    const dbConvenio = await convenioModel.getConveniosAliado(usuario);
    res.send(dbConvenio);
});

convenioRouter.get('/escuela', validateUsuarioQuery, async (req, res, next) => {
    const { usuario } = req.query;
    const dbConvenio = await convenioModel.getConveniosEscuela(usuario);
    res.send(dbConvenio);
});

convenioRouter.get('/', async (req, res, next) => {
    const dbConvenios = await convenioModel.getAllConvenios();
    res.send(dbConvenios);
});

convenioRouter.put('/linkContrato', validateLinkContratoQuery, async (req, res, next) => {
    const { id_convenio, link_contrato } = req.body;
    const dbConvenio = await convenioModel.updateLinkContrato(id_convenio, link_contrato);
    res.send(dbConvenio);
});

convenioRouter.put('/linkChat', validateLinkChatQuery, async (req, res, next) => {
    const { id_convenio, link_chat } = req.body;
    const dbConvenio = await convenioModel.updateLinkChat(id_convenio, link_chat);
    res.send(dbConvenio);
});

convenioRouter.put('/estatusFirmaAliado', validateFirmaQuery, async (req, res, next) => {
    const { id_convenio } = req.body;
    const dbConvenio = await convenioModel.updateEstatusFirmaAliado(id_convenio);
    res.send(dbConvenio);
});

convenioRouter.put('/estatusFirmaEscuela', validateFirmaQuery, async (req, res, next) => {
    const { id_convenio } = req.body;
    const dbConvenio = await convenioModel.updateEstatusFirmaEscuela(id_convenio);
    res.send(dbConvenio);
});

convenioRouter.put('/finalizado', validateFirmaQuery, async (req, res, next) => {
    const { id_convenio } = req.body;
    const dbConvenio = await convenioModel.updateFinalizado(id_convenio);
    res.send(dbConvenio);
});

convenioRouter.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});

module.exports = { convenioRouter };