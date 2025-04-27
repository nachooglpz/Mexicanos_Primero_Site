import './lista_convenios.css';

function ListadoConvenios() {
    return (
        <div className="listado-convenios-container">
            <div className="listado-convenios-sidebar">
                <h2 className="listado-convenios-menu-title">Menú</h2>
                <ul className="listado-convenios-menu">
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#perfil">Perfil</a></li>
                    <li><a href="#documentos">Documentos</a></li>
                </ul>
            </div>
            <div className="listado-convenios-main-content">
                <h1 className="listado-convenios-title">Lista de Convenios</h1>
                <div className="listado-convenios-chat-list">
                    <div className="listado-convenios-chat-card">
                        <h2>Convenio 1</h2>
                        <p>[ Detalles del convenio ]</p>
                    </div>
                    <div className="listado-convenios-chat-card">
                        <h2>Convenio 2</h2>
                        <p>[ Detalles del convenio ]</p>
                    </div>
                    <div className="listado-convenios-chat-card">
                        <h2>Convenio 3</h2>
                        <p>[ Detalles del convenio ]</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListadoConvenios;