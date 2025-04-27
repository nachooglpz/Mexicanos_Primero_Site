import { useState, useEffect } from 'react';
import '../css/pagina_documentos.css';

function PaginaDocumentos() {
    const [titulo, setTitulo] = useState('');
    const [link, setLink] = useState('');
    const [documentos, setDocumentos] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Formulario enviado');
        console.log('Título:', titulo);
        console.log('Link:', link);

        try {
            const response = await fetch('/api/documentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, link }),
            });

            console.log('Respuesta del servidor:', response);

            if (response.ok) {
                alert('Documento subido exitosamente');
                setTitulo('');
                setLink('');
                // Actualiza la lista de documentos después de subir uno nuevo
                fetchDocumentos();
            } else {
                const errorData = await response.json();
                console.log('Error del servidor:', errorData);
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al subir el documento:', error);
            alert('Error al subir el documento');
        }
    };

    const fetchDocumentos = async () => {
        try {
            const response = await fetch('/api/documentos');
            if (response.ok) {
                const data = await response.json();
                console.log('Documentos obtenidos:', data);
                setDocumentos(data);
            } else {
                console.error('Error al obtener los documentos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los documentos:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/documentos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Documento eliminado exitosamente');
                // Actualiza la lista de documentos después de eliminar uno
                fetchDocumentos();
            } else {
                const errorData = await response.json();
                console.error('Error del servidor:', errorData);
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al eliminar el documento:', error);
            alert('Error al eliminar el documento');
        }
    };

    useEffect(() => {
        fetchDocumentos();
    }, []);

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
                    <form id="upload-form" onSubmit={handleSubmit}>
                        <label htmlFor="document-title">Título de documento:</label>
                        <input
                            type="text"
                            id="document-title"
                            name="document-title"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                        <label htmlFor="document-link">Link de documento:</label>
                        <input
                            type="text"
                            id="document-link"
                            name="document-link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                        />
                        <button type="submit">Subir documento</button>
                    </form>
                </div>
                <div className="document-list">
                    <h2>Documentos Subidos</h2>
                    {documentos.length > 0 ? (
                        documentos.map((doc) => (
                            <div className="document-card" key={doc.id_documento}>
                                <h3>{doc.titulo}</h3>
                                <p>
                                    <a href={doc.link} target="_blank" rel="noopener noreferrer">
                                        {doc.link}
                                    </a>
                                </p>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(doc.id_documento)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No hay documentos subidos.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default PaginaDocumentos;