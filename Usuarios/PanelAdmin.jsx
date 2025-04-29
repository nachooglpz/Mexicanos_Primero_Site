import './panel_admin.css';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from './userSlice.js';
import {useEffect, useState} from "react";
import { Usuario, AdministradorDeEscuela, Aliado } from './Usuario.js';
import {Convenio} from "../Match/Convenio/Convenio.js";

function PanelAdmin() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.usuario.usuario);

    const [usuarios, setUsuarios] = useState([]);
    /*const [titulo, setTitulo] = useState('');
    const [link, setLink] = useState('');*/
    const [refresh, setRefresh] = useState(false);
    const [convenios, setConvenios] = useState([]);

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
    }, [refresh]);

    useEffect(() => {
        fetch(`api/convenios/`)
            .then((res) => res.json())
            .then((dataReturn) => {
                const nuevosConvenios = dataReturn.map((data) =>
                    new Convenio(data.id_convenio, data.link_chat, data.link_contrato, data.estatus_firma_aliado, data.estatus_firma_escuela, data.finalizado, data.fecha_inicio, data.empresa, data.escuela)
                );
                setConvenios(nuevosConvenios);
            });
    });

    const handleActivar = async (usuario, usertype) => {
        if (usertype === 'Aliado') {
            fetch(`/api/sesion/activarAliado?usuario=${usuario}`, {
                method: 'PUT',
            }).then((res) => {
                if (res.ok) {
                    alert('Aliado activado');
                } else {
                    alert('Error al activar el aliado');
                }
                setRefresh((prev) => !prev);
            });
        } else if (usertype === 'Administrador de Escuela') {
            fetch(`/api/sesion/activarEscuela?usuario=${usuario}`, {
                method: 'PUT',
            }).then((res) => {
                if (res.ok) {
                    alert('Escuela activada');

                } else {
                    alert('Error al activar la escuela');
                }
                setRefresh((prev) => !prev);
            });
        }
    };

    const handleDesactivar = async (usuario, usertype) => {
        if (usertype === 'Aliado') {
            fetch(`/api/sesion/desactivarAliado?usuario=${usuario}`, {
                method: 'PUT',
            }).then((res) => {
                if (res.ok) {
                    alert('Aliado desactivado');
                } else {
                    alert('Error al desactivar el aliado');
                }
                setRefresh((prev) => !prev);
            });
        } else if (usertype === 'Administrador de Escuela') {
            fetch(`/api/sesion/desactivarEscuela?usuario=${usuario}`, {
                method: 'PUT',
            }).then((res) => {
                if (res.ok) {
                    alert('Escuela desactivada');
                } else {
                    alert('Error al desactivar la escuela');
                }
                setRefresh((prev) => !prev);
            });
        }
    };

    const handleFinalizarConvenio = (id_convenio) => {
        fetch(`/api/convenios/finalizado?id_convenio=${id_convenio}`, {
            method: 'PUT',
        }).then((res) => {
            if (res.ok) {
                alert('Convenio finalizado');
            } else {
                alert('Error al finalizar el convenio');
            }
            setRefresh((prev) => !prev);
        })
    };

    /*const handleSubmit = async (e) => {
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
    };*/

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
                                        {usuario.estatus_activo && <button onClick={() => handleDesactivar(usuario.usuario, usuario.rol)}>Desactivar</button>}
                                        {!usuario.estatus_activo && <button onClick={() => handleActivar(usuario.usuario, usuario.rol)}>Activar</button>}
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
                                <th>Escuela</th>
                                <th>Aliado</th>
                                <th>Link del chat</th>
                                <th>Link del contrato</th>
                                <th>Estatus de firma del aliado</th>
                                <th>Estatus de firma del administrador de escuela</th>
                                <th>Finalizado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {convenios.map((convenio, index) => (
                            <tr key={index}>
                                <td>{convenio.id_convenio}</td>
                                <td>{convenio.escuela}</td>
                                <td>{convenio.empresa}</td>
                                <td>{convenio.link_chat}</td>
                                <td>{convenio.link_contrato}</td>
                                <td>{convenio.estatus_firma_aliado ? 'Firmado' : 'No Firmado'}</td>
                                <td>{convenio.estatus_firma_escuela ? 'Firmado' : 'No Firmado'}</td>
                                <td>{convenio.finalizado ? 'Sí' : 'No'}</td>
                                <td>
                                    <button onClick={() => handleFinalizarConvenio(convenio.id_convenio)}>Finalizar</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
                {/*<section id="documentos">
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
                </section>*/}
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