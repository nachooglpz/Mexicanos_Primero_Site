import '../css/lista_convenios.css'

function ListadoConvenios() {
    return (
        <>
            <div id="sidebar">
                <h2>Menú</h2>
                <ul>
                    <li><a href="../aliados/aliados.html">Inicio</a></li>
                    <li><a href="../perfil/perfil.html">Perfil</a></li>
                    <li><a href="../documentos/documentos.html">Carga de Documentos</a></li>
                </ul>
            </div>
            <div id="main-content">
                <h1>Lista de Convenios</h1>
                <div className="chat-list">
                    <button className="chat-card" onClick="location.href='../chat/chat.html'">
                        <h2>Usuario 1</h2>
                        <p>Texto del último mensaje...</p>
                    </button>
                    <button className="chat-card" onClick="location.href='../chat/chat.html'">
                        <h2>Usuario 2</h2>
                        <p>Texto del último mensaje...</p>
                    </button>
                    <button className="chat-card" onClick="location.href='../chat/chat.html'">
                        <h2>Usuario 3</h2>
                        <p>Texto del último mensaje...</p>
                    </button>
                    <button className="chat-card" onClick="location.href='../chat/chat.html'">
                        <h2>Usuario 4</h2>
                        <p>Texto del último mensaje...</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ListadoConvenios;