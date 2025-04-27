import { useEffect, useState } from 'react';
import { Usuario, AdministradorDeEscuela, Aliado } from '../models/Usuario';
import '../css/panel_admin.css';

function PanelAdmin() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch('/api/usuarios'); // Cambia esta URL según tu API
                const data = await res.json();

                // Mapea los datos a instancias de las clases
                const usuariosMapeados = data.map((usuario) => {
                    if (usuario.rol === 'Administrador de Escuela') {
                        return new AdministradorDeEscuela(
                            usuario.nombre,
                            usuario.usuario_escuela, // Cambia a usuario_escuela para administradores
                            usuario.contrasena,
                            usuario.email,
                            usuario.escuela,
                            usuario.direccion,
                            usuario.cct,
                            usuario.nivel_educativo,
                            usuario.estatus_activo,
                            usuario.necesidades
                        );
                    } else if (usuario.rol === 'Aliado') {
                        return new Aliado(
                            usuario.nombre,
                            usuario.usuario_aliado, // Cambia a usuario_aliado para aliados
                            usuario.contrasena,
                            usuario.email,
                            usuario.empresa,
                            usuario.sector,
                            usuario.direccion,
                            usuario.estatus_activo,
                            usuario.tipo_apoyo
                        );
                    } else {
                        return new Usuario(
                            usuario.nombre,
                            usuario.usuario, // Esto es para cualquier otro caso
                            usuario.contrasena,
                            usuario.email,
                            usuario.rol,
                            usuario.estatus_activo
                        );
                    }
                });

                setUsuarios(usuariosMapeados);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <>
            <header>
                <h1>Panel de Administración</h1>
            </header>
            <div id="sidebar">
                <h2>Menú</h2>
                <ul>
                    <li><a href="../perfil/perfil.html">Perfil</a></li>
                    <li><a href="../convenios/chatlist.html">Chat</a></li>
                </ul>
            </div>
            <main>
                <section id="usuarios">
                    <h2>Lista de Usuarios</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => {
                
                                return (
                                    <tr key={index}>
                                        <td>{usuario.usuario}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.rol}</td>
                                        <td>{usuario.estatus_activo ? 'Activo' : 'Inactivo'}</td>
                                        <td>
                                            <button>Editar</button>
                                            <button>Eliminar</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button id="crear-usuario">Crear Nuevo Usuario Administrador</button>
                </section>
                <section id="convenios">
                    <h2>Lista de Convenios</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre del Convenio</th>
                                <th>Usuario Creador</th>
                                <th>Revisar Cronograma</th>
                                <th>Finalizar convenio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aquí se llenará la lista de convenios dinámicamente */}
                        </tbody>
                    </table>
                </section>

                <div id="notifications">
                    <h2>Notificaciones</h2>
                    <ul>
                        <li>Notificación 1</li>
                        <li>Notificación 2</li>
                        <li>Notificación 3</li>
                    </ul>
                </div>
            </main>
        </>
    );
}

export default PanelAdmin;