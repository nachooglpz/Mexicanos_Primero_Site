import '../src/css/pagina_documentos.css';

function PaginaDocumentos() {
    return (
        <div className="pagina-documentos-container">
            <div className="pagina-documentos-sidebar">
                <h2>Menú</h2>
                <ul>
                    <li><a href="#inicio">Inicio</a></li>
                    <li><a href="#perfil">Perfil</a></li>
                    <li><a href="#chat">Chat</a></li>
                </ul>
            </div>
            <div className="pagina-documentos-main-content">
                <h1>Carga de Documentos</h1>
                <div className="pagina-documentos-upload-section">
                    <form className="pagina-documentos-upload-form">
                        <label htmlFor="document-title">Título del documento:</label>
                        <input type="text" id="document-title" name="document-title" required />
                        <label htmlFor="document-link">Enlace del documento:</label>
                        <input type="text" id="document-link" name="document-link" required />
                        <button type="submit">Subir documento</button>
                    </form>
                </div>
                <div className="pagina-documentos-list">
                    <h2>Documentos Subidos</h2>
                    <div className="pagina-documentos-card">
                        <h3>Documento 1</h3>
                        <p>[ Enlace del documento ]</p>
                        <button className="pagina-documentos-delete-button">Eliminar</button>
                    </div>
                    <div className="pagina-documentos-card">
                        <h3>Documento 2</h3>
                        <p>[ Enlace del documento ]</p>
                        <button className="pagina-documentos-delete-button">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaDocumentos;