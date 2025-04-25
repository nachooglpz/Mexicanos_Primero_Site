import '../css/panel_admin.css';

function PanelAdmin() {
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