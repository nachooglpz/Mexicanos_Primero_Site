import '../css/pagina_documentos.css'

function PaginaDocumentos() {
    return (
        <>
            <div id="sidebar">
                <h2>Menú</h2>
                <ul>
                    <li><a href="../aliados/aliados.html">Inicio</a></li>
                    <li><a href="../perfil/perfil.html">Perfil</a></li>
                    <li><a href="../convenios/chatlist.html">Chat</a></li>
                </ul>
            </div>
            <div id="main-content">
                <h1>Carga de Documentos</h1>
                <div className="upload-section">
                    <form id="upload-form">
                        <label htmlFor="document-title">Título de documento:</label>
                        <input type="text" id="document-title" name="document-title" required />
                        <label htmlFor="document-link">Link de documento:</label>
                        <input type="text" id="document-link" name="document-link" required />
                        <button type="submit">Suir documento</button>
                    </form>
                </div>
                <div className="document-list">
                    <h2>Documentos Subidos</h2>
                    <div className="document-card">
                        <h3>Documento 1</h3>
                        <p>[ Link del documento ]</p>
                        <button className="delete-button">Eliminar</button>
                    </div>
                    <div className="document-card">
                        <h3>Documento 2</h3>
                        <p>[ Link del documento ]</p>
                        <button className="delete-button">Eliminar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaginaDocumentos;