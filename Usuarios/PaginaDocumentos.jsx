import './pagina_documentos.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

function PaginaDocumentos() {
    const [titulo, setTitulo] = useState('');
    const [link, setLink] = useState('');
    const [documentos, setDocumentos] = useState([]);
    const usuario = useSelector(state => state.usuario.usuario);
    const tipo_usuario = useSelector(state => state.usuario.tipo_usuario);
    const navigate = useNavigate();

    const getHomeRoute = () => {
        console.log('getHomeRoute - tipo_usuario from Redux:', tipo_usuario);
        
        if (tipo_usuario) {
            switch(tipo_usuario) {
                case 'aliado':
                    console.log('Returning route for aliado');
                    return '/vistaAliados';
                case 'escuela':
                    console.log('Returning route for escuela');
                    return '/vistaEscuelas';
                case 'admin':
                    console.log('Returning route for admin');
                    return '/vistaAdmin';
                default:
                    console.log('No match in Redux state, trying localStorage');
                    break;
            }
        }
        
        const fallbackType = localStorage.getItem('tipo_usuario');
        console.log('getHomeRoute - fallbackType from localStorage:', fallbackType);
        
        switch(fallbackType) {
            case 'aliado':
                console.log('Returning fallback route for aliado');
                return '/vistaAliados';
            case 'escuela':
                console.log('Returning fallback route for escuela');
                return '/vistaEscuelas';
            case 'admin':
                console.log('Returning fallback route for admin');
                return '/vistaAdmin';
            default:
                console.log('No route found, returning to root');
                return '/';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Enviando documento:', { titulo, link, tipo_usuario, usuario });

        try {
            const response = await fetch('/api/documentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    titulo,
                    link,
                    tipo_usuario,
                    usuario
                }),
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            if (response.ok) {
                alert('Documento subido exitosamente');
                setTitulo('');
                setLink('');
                fetchDocumentos();
            } else {
                console.error('Error del servidor:', data);
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al subir el documento:', error);
            alert('Error al subir el documento: ' + error.message);
        }
    };

    const fetchDocumentos = async () => {
        try {
            const response = await fetch(`/api/documentos/${tipo_usuario}/${usuario}`);
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

    const handleDelete = async (id_documento) => {
        try {
            const response = await fetch(`/api/documentos/${tipo_usuario}/${id_documento}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert('Documento eliminado exitosamente');
                fetchDocumentos(); // Refresh the list
            } else {
                console.error('Error del servidor:', data);
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al eliminar el documento:', error);
            alert('Error al eliminar el documento');
        }
    };

    useEffect(() => {
        fetchDocumentos();
    }, []);

    useEffect(() => {
        const userType = tipo_usuario || localStorage.getItem('tipo_usuario');
        if (!userType) {
            console.warn('No user type found, redirecting to login');
            navigate('/');
        }
    }, [tipo_usuario, navigate]);

    return (
        <div className="pagina-documentos-container">
            <div className="pagina-documentos-sidebar">
                <h2>Menú</h2>
                <ul>
                    <li>
                        <Link to={(() => {
                            const route = getHomeRoute();
                            console.log('Route being used:', route);
                            return route;
                        })()}>
                            Inicio
                        </Link>
                    </li>
                    <li><Link to="/modificarPerfil">Perfil</Link></li>
                    <li><Link to="/">Convenios</Link></li>
                </ul>
            </div>
            <div className="pagina-documentos-main-content">
                <h1>Carga de Documentos</h1>
                <div className="pagina-documentos-upload-section">
                    <form className="pagina-documentos-upload-form" onSubmit={handleSubmit}>
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
                <div className="pagina-documentos-list">
                    <h2>Documentos Subidos</h2>
                    {documentos.length > 0 ? (
                        documentos.map((doc) => (
                            <div className="pagina-documentos-card" key={doc.id_documento}>
                                <h3>{doc.titulo}</h3>
                                <p>
                                    <a href={doc.link} target="_blank" rel="noopener noreferrer">
                                        {doc.link}
                                    </a>
                                </p>
                                <button
                                    className="pagina-documentos-delete-button"
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
        </div>
    );
}

export default PaginaDocumentos;