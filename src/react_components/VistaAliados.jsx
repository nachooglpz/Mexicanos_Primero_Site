import { useEffect, useState } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/pagina_principal.css'
import MapComponentSchool from './mapcomponent_escuela';


class Escuela {
    constructor(data, necesidades = []) {
        this.usuario_escuela = data.usuario_escuela;
        this.nombre = data.nombre;
        this.direccion = data.direccion;
        this.escuela = data.escuela;
        this.cct = data.cct;
        this.necesidades = necesidades.map((necesidad) => necesidad.necesidad);
    }
}

function VistaAliados({username}) {
    const [filters, setFilters] = useState({ keyWord: '', necesidad: '' });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
        <div id="sidebar">
            <h2>Menú</h2>
            <ul>
                <li><a href="../perfil/perfil.html">Perfil</a></li>
                <li><a href="../convenios/chatlist.html">Chat</a></li>
                <li><a href="../documentos/documentos.html">Carga de Documentos</a></li>
            </ul>
        </div>
        <div className="main-content">
            <h1>Lista de Escuelas</h1>
            <SearchFilter onFilterChange={handleFilterChange}/>
            <SchoolList filters={filters} />
            <AllyNotis username={username} />
            <h1>Mapa de ubicacion de Aliados </h1>
            <MapComponentSchool/>

            {/* <div id="notifications">
                <h2>Notificaciones</h2>
                <ul>
                    <li>Notificación 1</li>
                    <li>Notificación 2</li>
                    <li>Notificación 3</li>
                </ul>
            </div> */}
        </div>
        </>
    );
}

function SearchFilter({ onFilterChange }) {
    const [necesidades, setNecesidades] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [selectedNecesidad, setSelectedNecesidad] = useState('');

    useEffect(() => {
        fetch('/api/escuelas/distinctNecesidades')
            .then((res) => res.json())
            .then((data) => {
                const necesidadesList = data.map((item) => item.necesidad);
                setNecesidades(necesidadesList);
            });
    }, []);

    const handlekeyWordChange = (e) => {
        const value = e.target.value;
        setSearchKeyWord(value);
        onFilterChange({ keyWord: value, necesidad: selectedNecesidad });
    };

    const handleNecesidadChange = (e) => {
        const value = e.target.value;
        setSelectedNecesidad(value);
        onFilterChange({ keyWord: searchKeyWord, necesidad: value });
    };
    
    return (
        <div className="search-filter">
            <input type="text" id="search" placeholder="Buscar escuelas..." onChange={handlekeyWordChange} />
            <select id="support-filter" onChange={handleNecesidadChange}>
                <option value="">Filtrar por necesidad</option>
                {necesidades.map((necesidad, index) => (
                    <option key={`necesidad-${index}`} value={necesidad}>{necesidad}</option>
                ))}
            </select>
        </div>
    );
}

function SchoolList({filters}) {
    const [escuelas, setEscuelas] = useState([]);
    const [escuelasInstances, setEscuelasInstances] = useState([]);

    useEffect(() => {
        // Fetch escuelas
        fetch(`/api/escuelas/filtered?keyWord=${filters.keyWord}&necesidad=${filters.necesidad}`)
            .then((res) => res.json())
            .then((data) => {
                setEscuelas(data);

                // Fetch necesidades for each Escuela and create Escuela instances
                const fetchNecesidadesPromises = data.map((escuela) =>
                fetch(`/api/escuelas/necesidades?usuario=${escuela.usuario_escuela}`)
                    .then((res) => res.json())
                    .then((necesidades) => new Escuela(escuela, necesidades))
                );

                Promise.all(fetchNecesidadesPromises).then((instances) => {
                    setEscuelasInstances(instances);
                });
            });
    }, [filters]);

    return (
        <div className="ally-list">
            {escuelasInstances.map((escuela) => (
                <div key={escuela.usuario_escuela} className="ally-card">
                    <h2>{escuela.escuela}</h2>
                    <p>Contacto: {escuela.nombre}</p>
                    <p>Necesidades:</p>
                    <ul>
                        {escuela.necesidades.map((necesidad, index) => (
                            <li key={index}>{necesidad}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

function AllyNotis({username}) {
    const [notis, setNotis] = useState([]);

    useEffect(() => {
        // Fetch notificaciones
        fetch(`/api/notificaciones/aliados?usuario=${username}`)
            .then((res) => res.json())
            .then((data) => {
                setNotis(data);
            })
    }, []);

    return (
        <div id="notifications">
            <h1 id="title">Notificaciones</h1>
            <ul>
                {notis.map((noti, index) => (
                    <li key={`notis-${index}`}>
                        <h2>{noti.titulo}</h2>
                        <p>{noti.texto}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VistaAliados;