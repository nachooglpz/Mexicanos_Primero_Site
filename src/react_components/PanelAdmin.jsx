import '../css/panel_admin.css'

function PanelAdmin() {
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