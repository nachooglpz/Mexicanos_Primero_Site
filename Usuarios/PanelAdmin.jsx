import './panel_admin.css';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './userSlice.js';
import {useEffect, useState} from "react";
import { Usuario, AdministradorDeEscuela, Aliado } from './Usuario.js';

function PanelAdmin() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.usuario.usuario);

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await fetch('/api/usuarios');
                const data = await res.json();

                const usuariosMapeados = data.map((usuario) => {
                    if (usuario.rol === 'Administrador de Escuela') {
                        return new AdministradorDeEscuela(
                            usuario.nombre,
                            usuario.usuario_escuela,
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
                            usuario.usuario_aliado,
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
                            usuario.usuario,
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
            <div className="panel-admin-sidebar">
                <h2>Menú</h2>
                <ul>
                    <li><Link to="/modificarPerfil">Perfil</Link></li>
                    <li><Link to="/" onClick={() => dispatch(logout())}>Cerrar Sesión</Link></li>
                </ul>
            </div>
            <div className="panel-admin-main">
                <h1>Panel de Administración</h1>
                <section className="panel-admin-usuarios">
                    <h2>Lista de Usuarios</h2>
                    <table className="panel-admin-table">
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
                            {usuarios.map((usuario, index) => (
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
                            ))}
                        </tbody>
                    </table>
                    <button className="panel-admin-crear-usuario">Crear Nuevo Usuario Administrador</button>
                </section>
                <section className="panel-admin-convenios">
                    <h2>Lista de Convenios</h2>
                    <table className="panel-admin-table">
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
                <AdminNotis username={username} />
            </div>
        </>
    );
}

function AdminNotis({username}) {
    const [notis, setNotis] = useState([]);

    useEffect(() => {
        fetch(`/api/notificaciones/admin?usuario=${username}`)
            .then((res) => res.json())
            .then((data) => {
                setNotis(data);
            });
    }, []);

    return (
        <div className="panel-admin-notifications">
            <h1>Notificaciones</h1>
            <ul>
                {notis.length === 0
                    ? <li key={`notis-no-data`}>
                        <h2>Sin notificaciones</h2>
                    </li>
                    : notis.map((noti, index) => (
                        <li key={`notis-${index}`}>
                            <h2>{noti.titulo}</h2>
                            <p>{noti.texto}</p>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default PanelAdmin;