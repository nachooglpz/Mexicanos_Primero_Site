import '../css/panel_admin.css';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../Usuario/userSlice.js';
import {useEffect, useState} from "react";

function PanelAdmin() {
    const dispatch = useDispatch();
    const username = useSelector((state) => state.usuario.usuario);

    return (
        <>
            <header className="panel-admin-header">
                <h1>Panel de Administración</h1>
            </header>
            <div className="panel-admin-sidebar">
                <h2>Menú</h2>
                <ul>
                    <li><Link to="/modificarPerfil">Perfil</Link></li>
                    {/*<li><a href="../convenios/chatlist.html">Chat</a></li>*/}
                    <li><Link to="/" onClick={() => dispatch(logout())}>Cerrar Sesión</Link></li>
                </ul>
            </div>
            <main className="panel-admin-main">
                <section className="panel-admin-usuarios">
                    <h2>Lista de Usuarios</h2>
                    <table className="panel-admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aquí se llenará la lista de usuarios dinámicamente */}
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
            </main>
        </>
    );
}

function AdminNotis({username}) {
    const [notis, setNotis] = useState([]);

    useEffect(() => {
        // Fetch notificaciones
        fetch(`/api/notificaciones/admin?usuario=${username}`)
            .then((res) => res.json())
            .then((data) => {
                setNotis(data);
            })
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