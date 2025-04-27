class Usuario {
    constructor (nombre, usuario, contrasena, email, rol, estatus_activo) {
        this._nombre = nombre;
        this._usuario = usuario;
        this._contrasena = contrasena;
        this._email = email;
        this._rol = rol;
        this._estatus_activo = estatus_activo;
    }
    get nombre() {
        return this._nombre;
    }
    get usuario() {
        return this._usuario;
    }
    get contrasena() {
        return this._contrasena;
    }
    get email() {
        return this._email;
    }
    get rol() {
        return this._rol;
    }
    get estatus_activo() {
        return this._estatus_activo;
    }

}

class AdministradorDeEscuela extends Usuario {
    constructor (nombre, usuario_escuela, contrasena, email, escuela, direccion, cct, nivel_educativo, estatus_activo, necesidades = []) {
        super(nombre, usuario_escuela, contrasena, email, 'Administrador de Escuela', estatus_activo);
        this._escuela = escuela;
        this._direccion = direccion;
        this._cct = cct;
        this._nivel_educativo = nivel_educativo;
        this._necesidades = necesidades;
    }
    get escuela() {
        return this._escuela;
    }
    get direccion() {
        return this._direccion;
    }
    get cct() {
        return this._cct;
    }
    get nivel_educativo() {
        return this._nivel_educativo;
    }
    get necesidades() {
        return this._necesidades;
    }
}

class Aliado extends Usuario {
    constructor (nombre, usuario_aliado, contrasena, email, empresa, sector, direccion, estatus_activo, tipo_apoyo = []) {
        super(nombre, usuario_aliado, contrasena, email, 'Aliado', estatus_activo);
        this._empresa = empresa;
        this._sector = sector;
        this._direccion = direccion;
        this._tipo_apoyo = tipo_apoyo.map((apoyo) => apoyo.tipo_apoyo);
    }

    get empresa() {
        return this._empresa;
    }
    get sector() {
        return this._sector;
    }
    get direccion() {
        return this._direccion;
    }
    get tipo_apoyo() {
        return this._tipo_apoyo;
    }
}

class Administrador extends Usuario {
    constructor (nombre, usuario_admin, contrasena, email) {
        super(nombre, usuario_admin, contrasena, email, 'Administrador', true);
    }


}

export { Usuario, AdministradorDeEscuela, Aliado, Administrador };