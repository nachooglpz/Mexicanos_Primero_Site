class Convenio {
    constructor(id_convenio, link_chat, link_contrato, estatus_firma_aliado, estatus_firma_escuela, finalizado, fecha_inicio, empresa, escuela) {
        this._id_convenio = id_convenio;
        this._link_chat = link_chat;
        this._link_contrato = link_contrato;
        this._estatus_firma_aliado = estatus_firma_aliado;
        this._estatus_firma_escuela = estatus_firma_escuela;
        this._finalizado = finalizado;
        this._fecha_inicio = fecha_inicio;
        this._empresa = empresa;
        this._escuela = escuela;
    }

    get id_convenio() {
        return this._id_convenio;
    }
    get link_chat() {
        return this._link_chat;
    }
    get link_contrato() {
        return this._link_contrato;
    }
    get estatus_firma_aliado() {
        return this._estatus_firma_aliado;
    }
    get estatus_firma_escuela() {
        return this._estatus_firma_escuela;
    }
    get finalizado() {
        return this._finalizado;
    }
    get fecha_inicio() {
        return this._fecha_inicio;
    }
    get empresa() {
        return this._empresa;
    }
    get escuela() {
        return this._escuela;
    }

}

export { Convenio };