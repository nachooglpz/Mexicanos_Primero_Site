class Usuario {
    constructor (nombre, usuario, contrasena, email, rol, estatus_activo) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.email = email;
        this.rol = rol;
        this.estatus_activo = estatus_activo;
    }
}

class AdministradorDeEscuela extends Usuario {
    constructor (nombre, usuario_escuela, contrasena, email, escuela, direccion, cct, nivel_educativo, estatus_activo, necesidades = []) {
        super(nombre, usuario_escuela, contrasena, email, 'Administrador de Escuela', estatus_activo);
        this.escuela = escuela;
        this.direccion = direccion;
        this.cct = cct;
        this.nivel_educativo = nivel_educativo;
        this.necesidades = necesidades;
    }
}

class Aliado extends Usuario {
    constructor (nombre, usuario_aliado, contrasena, email, empresa, sector, direccion, estatus_activo, tipo_apoyo = []) {
        super(nombre, usuario_aliado, contrasena, email, 'Aliado', estatus_activo);
        this.empresa = empresa;
        this.sector = sector;
        this.direccion = direccion;
        this.tipo_apoyo = tipo_apoyo.map((apoyo) => apoyo.tipo_apoyo);
    }
}

class Administrador extends Usuario {
    constructor (nombre, usuario_admin, contrasena, email) {
        super(nombre, usuario_admin, contrasena, email, 'Administrador', true);
    }
}

export { Usuario, AdministradorDeEscuela, Aliado, Administrador };