import '../css/panel_admin.css';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/userSlice.js';
import { useEffect, useState } from 'react';
import { Usuario, AdministradorDeEscuela, Aliado } from '../models/Usuario';

function PanelAdmin() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.usuario.usuario);

    const [usuarios, setUsuarios] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [link, setLink] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Formulario enviado'); // Verifica si el método se ejecuta
        console.log('Título:', titulo); // Verifica el valor de "titulo"
        console.log('Link:', link); // Verifica el valor de "link"

        try {
            const response = await fetch('/api/documentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, link }),
            });

            console.log('Respuesta del servidor:', response); // Verifica la respuesta del servidor

            if (response.ok) {
                alert('Documento subido exitosamente');
                setTitulo('');
                setLink('');
            } else {
                const errorData = await response.json();
                console.log('Error del servidor:', errorData); // Verifica el error del servidor
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al subir el documento:', error); // Verifica si ocurre un error en el fetch
            alert('Error al subir el documento');
        }
    };

    return (
        <>
            <header className="panel-admin-header">
                <h1>Panel de Administración</h1>
            </header>
            <div className="panel-admin-sidebar">
                <h2>Menú</h2>
                <ul>
                    <li><a href="../perfil/perfil.html">Perfil</a></li>
                    <li><a href="../convenios/chatlist.html">Chat</a></li>
                    <li><Link to="/" onClick={() => dispatch(logout())}>Cerrar Sesión</Link></li>
                </ul>
            </div>
            <main className="panel-admin-main">
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

                <section id="documentos">
                    <h2>Subir Documento</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log('Evento onSubmit disparado'); // Verifica si el evento se dispara
                            handleSubmit(e);
                        }}
                    >
                        <label htmlFor="titulo">Título del Documento:</label>
                        <input
                            type="text"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                        <label htmlFor="link">Link del Documento:</label>
                        <input
                            type="text"
                            id="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                        <button type="submit">Subir Documento</button>
                    </form>
                </section>

                <div className="panel-admin-notifications">
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