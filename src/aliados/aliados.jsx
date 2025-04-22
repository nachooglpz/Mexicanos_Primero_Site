import { useEffect, useState } from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './aliados.css'

class Aliado {
  constructor(data, tipos_de_ayuda = []) {
    this.usuario_aliado = data.usuario_aliado;
    this.nombre = data.nombre;
    this.empresa = data.empresa;
    this.sector = data.sector;
    this.direccion = data.direccion;
    this.tipos_de_ayuda = tipos_de_ayuda.map((ayuda) => ayuda.tipo_apoyo);
  }
}

function AliadosApp({username}) {
    document.title = "Páigna de Inicio";
    const [filters, setFilters] = useState({ keyWord: '', sector: '', apoyo: '', });

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
            <h1>Lista de Aliados</h1>
            <SearchFilter onFilterChange={handleFilterChange}/>
            <AllyList filters={filters} />
            <AllyNotis username={username}/>
            
        </div>
        </>
    );
}

function SearchFilter({ onFilterChange }) {
    const [sectores, setSectores] = useState([]);
    const [apoyos, setApoyos] = useState([]);
    const [searchKeyWord, setSearchKeyWord] = useState('');
    const [selectedSector, setSelectedSector] = useState('');
    const [selectedApoyo, setSelectedApoyo] = useState('');

    useEffect(() => {
        fetch('/api/aliados/sectores')
            .then((res) => res.json())
            .then((data) => {
                const sectoresList = data.map((item) => item.sector);
                setSectores(sectoresList);
            });
    }, []);

    useEffect(() => {
        fetch('/api/aliados/distinctApoyos')
            .then((res) => res.json())
            .then((data) => {
                const apoyosList = data.map((item) => item.tipo_apoyo);
                setApoyos(apoyosList);
            });
    }, []);

    const handleKeyWordChange = (e) => {
        const value = e.target.value;
        setSearchKeyWord(value);
        onFilterChange({ keyWord: value, sector: selectedSector, apoyo: selectedApoyo })
    };

    const handleSectorChange = (e) => {
        const value = e.target.value;
        setSelectedSector(value);
        onFilterChange({ keyWord: searchKeyWord, sector: value, apoyo: selectedApoyo });
    };

    const handleApoyoChange = (e) => {
        const value = e.target.value;
        setSelectedApoyo(value);
        onFilterChange({ keyWord: searchKeyWord, sector: selectedSector, apoyo: value });
    };

    return (
        <div className="search-filter">
            <input type="text" id="search" placeholder="Buscar aliados..." onChange={handleKeyWordChange} />
            <select id="sector-filter" value={selectedSector} onChange={handleSectorChange}>
                <option value="">Filtrar por sector</option>
                {sectores.map((sector, index) => (
                    <option key={`sector-${index}`} value={sector}>{sector}</option>
                ))}
            </select>
            <select id="support-filter" value={selectedApoyo} onChange={handleApoyoChange}>
                <option value="">Filtrar por tipo de apoyo</option>
                {apoyos.map((apoyo, index) => (
                    <option key={`apoyo-${index}`} value={apoyo}>{apoyo}</option>
                ))}
            </select>
        </div>
    );
}

function AllyList({filters}) {
    const [aliados, setAliados] = useState([]);
    const [aliadosInstances, setAliadosInstances] = useState([]);

    useEffect(() => {
        // Fetch aliados
        fetch(`/api/aliados/filtered?name=${filters.keyWord}&sector=${filters.sector}&apoyo=${filters.apoyo}`)
            .then((res) => res.json())
            .then((data) => {
                setAliados(data);

                // Fetch apoyos for each aliado and create Aliado instances
                const fetchApoyosPromises = data.map((aliado) =>
                fetch(`/api/aliados/apoyos?usuario_aliado=${aliado.usuario_aliado}`)
                    .then((res) => res.json())
                    .then((apoyos) => new Aliado(aliado, apoyos))
                );

                Promise.all(fetchApoyosPromises).then((instances) => {
                setAliadosInstances(instances);
                });
            });
    }, [filters]);

    return (
        <div className="ally-list">
            {aliadosInstances.map((aliado) => (
                    <div key={aliado.usuario_aliado} className="ally-card">
                        <h2>{aliado.empresa}</h2>
                        <p>Contacto: {aliado.nombre}</p>
                        <p>Sector: {aliado.sector}</p>
                        <p>Tipos de Apoyo:</p>
                        <ul>
                            {aliado.tipos_de_ayuda.map((ayuda, index) => (
                                <li key={index}>{ayuda}</li>
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
        fetch(`/api/notificaciones/escuelas?usuario=${username}`)
            .then((res) => res.json())
            .then((data) => {
                setNotis(data);
            })
    }, []);

    return (
        <div id="notifications">
            <h2 id="title">Notificaciones</h2>
            <ul>
                {notis.map((noti, index) => (
                    <li key={`notis-${index}`}>
                        <h2>{noti.titulo}</h2>
                        <p>{noti.texto}</p>
                    </li>
                ))}
                {/* <li>Notificación 1</li>
                <li>Notificación 2</li>
                <li>Notificación 3</li> */}
            </ul>
        </div>
    );
}

export default AliadosApp;
