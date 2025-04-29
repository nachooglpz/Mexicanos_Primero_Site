const db = require('../../db.cjs');

const getConveniosAliado = async (usuario_aliado) => {
    const convenios = await db.query('select c.*, a.empresa, ade.escuela from convenio c join usuarios_por_convenio upc on c.id_convenio = upc.id_convenio join aliados a on upc.usuario_aliado = a.usuario_aliado join administradores_de_escuela ade on upc.usuario_escuela = ade.usuario_escuela where upc.usuario_aliado = $1', [usuario_aliado]);
    return convenios.rows;
}

const getConveniosEscuela = async (usuario_escuela) => {
    const convenios = await db.query('select c.*, a.empresa, ade.escuela from convenio c join usuarios_por_convenio upc on c.id_convenio = upc.id_convenio join aliados a on upc.usuario_aliado = a.usuario_aliado join administradores_de_escuela ade on upc.usuario_escuela = ade.usuario_escuela where upc.usuario_escuela = $1', [usuario_escuela]);
    return convenios.rows;
}

const getAllConvenios = async () => {
    const convenios = await db.query('select c.*, a.empresa, ade.escuela from convenio c join usuarios_por_convenio upc on c.id_convenio = upc.id_convenio join aliados a on upc.usuario_aliado = a.usuario_aliado join administradores_de_escuela ade on upc.usuario_escuela = ade.usuario_escuela');
    return convenios.rows;
}

const createConvenio = async (usuario_aliado, usuario_escuela, fechaInicio) => {
    const result = await db.query('INSERT INTO convenio (fecha_inicio) VALUES ($1) RETURNING *', [fechaInicio]);
    const id =  result.rows[0].id_convenio;

    const created = await db.query('INSERT INTO usuarios_por_convenio (usuario_aliado, usuario_escuela, id_convenio) VALUES ($1, $2, $3)', [usuario_aliado, usuario_escuela, id]);
    return created;
}

const updateLinkContrato = async (id_convenio, link_contrato) => {
    const result = await db.query('UPDATE convenio SET link_contrato = $1 WHERE id_convenio = $2', [link_contrato, id_convenio]);
    return result.rows;
}

const updateLinkChat = async (id_convenio, link_chat) => {
    const result = await db.query('UPDATE convenio SET link_chat = $1 WHERE id_convenio = $2', [link_chat, id_convenio]);
    return result.rows;
}

const updateEstatusFirmaAliado = async (id_convenio) => {
    const result = await db.query('UPDATE convenio SET estatus_firma_aliado = true WHERE id_convenio = $1', [id_convenio]);
    return result.rows;
}

const updateEstatusFirmaEscuela = async (id_convenio) => {
    const result = await db.query('UPDATE convenio SET estatus_firma_escuela = true WHERE id_convenio = $1', [id_convenio]);
    return result.rows;
}

const updateFinalizado = async (id_convenio) => {
    const result = await db.query('UPDATE convenio SET finalizado = true WHERE id_convenio = $1', [id_convenio]);
    return result.rows;
}

const updateConvenio = async (id_convenio, link_chat, link_contrato, estatus_firma_aliado, estatus_firma_escuela) => {
    const result = await db.query('UPDATE convenio SET link_chat = $1, link_contrato = $2, estatus_firma_aliado = $3, estatus_firma_escuela = $4 WHERE id_convenio = $5 RETURNING *', [link_chat, link_contrato, estatus_firma_aliado, estatus_firma_escuela, id_convenio]);
    return result.rows;
}

const getConvenio = async (id_convenio) => {
    const result = await db.query('SELECT c.*, a.empresa, ade.escuela FROM convenio c join usuarios_por_convenio upc on c.id_convenio = upc.id_convenio join aliados a on upc.usuario_aliado = a.usuario_aliado join administradores_de_escuela ade on upc.usuario_escuela = ade.usuario_escuela where c.id_convenio = $1', [id_convenio]);
    return result.rows;
}

module.exports = { getConveniosAliado, getConveniosEscuela, getAllConvenios, createConvenio, updateLinkContrato, updateLinkChat, updateEstatusFirmaAliado, updateEstatusFirmaEscuela, updateFinalizado, updateConvenio, getConvenio };