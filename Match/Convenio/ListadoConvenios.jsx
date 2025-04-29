import './lista_convenios.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Convenio } from './Convenio.js';

function ListadoConvenios() {
    document.title = 'Modificar Perfil';

    const usertype = useSelector((state) => state.usuario.tipo_usuario);
    const username = useSelector((state) => state.usuario.usuario);

    const [convenios, setConvenios] = useState([]);

    useEffect(() => {
        if (usertype === 'aliado') {
            fetch(`/api/convenios/aliado?usuario=${username}`)
                .then((res) => res.json())
                .then((dataReturn) => {
                    const nuevosConvenios = dataReturn.map((data) =>
                        new Convenio(data.id_convenio, data.link_chat, data.link_contrato, data.estatus_firma_aliado, data.estatus_firma_escuela, data.finalizado, data.fecha_inicio)
                    );
                    setConvenios(nuevosConvenios);
                })
        } else if (usertype === 'escuela') {
            fetch(`/api/convenios/escuela?usuario=${username}`)
                .then((res) => res.json())
                .then((dataReturn) => {
                    const nuevosConvenios = dataReturn.map((data) =>
                        new Convenio(data.id_convenio, data.link_chat, data.link_contrato, data.estatus_firma_aliado, data.estatus_firma_escuela, data.finalizado, data.fecha_inicio)
                    );
                    setConvenios(nuevosConvenios);
                })
        }
    }, [])

    return (
        <div className="listado-convenios-container">
            <div className="listado-convenios-sidebar">
                <h2 className="listado-convenios-menu-title">Menú</h2>
                <ul className="listado-convenios-menu">
                    <li><Link to='/paginaPrincipal'>Inicio</Link></li>
                    <li><Link to='/modificarPerfil'>Perfil</Link></li>
                    <li><Link to='/documentos'>Documentos</Link></li>
                </ul>
            </div>
            <div className="listado-convenios-main-content">
                <h1 className="listado-convenios-title">Lista de Convenios</h1>
                <div className="listado-convenios-chat-list">
                    {convenios.length === 0 ? <h2>No hay convenios activos</h2>
                        : convenios.map((convenio, index) => (
                        (!convenio.finalizado) && <div key={index} className="listado-convenios-chat-card">
                            <h2>Convenio {convenio.id_convenio}</h2>
                            <p>Fecha de Inicio: {convenio.fecha_inicio.split('T')[0]}</p>
                            <p>Link de Chat: {convenio.link_chat}</p>
                            <p>Link de Contrato: {convenio.link_contrato}</p>
                            <p>Estatus Firma Aliado: {convenio.estatus_firma_aliado ? 'Firmado' : 'No Firmado'}</p>
                            <p>Estatus Firma Escuela: {convenio.estatus_firma_escuela ? 'Firmado' : 'No Firmado'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListadoConvenios;