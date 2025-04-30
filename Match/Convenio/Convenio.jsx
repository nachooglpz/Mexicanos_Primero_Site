import './convenio.css';
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Convenio } from './Convenio.js';
import {useSelector} from "react-redux";

function PresentConvenio() {
    const navigate = useNavigate();
    const usertype = useSelector((state) => state.usuario.tipo_usuario);

    const {id_convenio} = useParams();
    const [convenio, setConvenio] = useState(new Convenio(null, null, null, null, null, null, null, null, null));
    const [cambios, setCambios] = useState({
        link_chat: null,
        link_contrato: null,
        estatus_firma_aliado: false,
        estatus_firma_escuela: false,
    });
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetch(`/api/convenios/${id_convenio}`)
            .then((res) => res.json())
            .then((data) => {
                const thisConvenio = new Convenio(data[0].id_convenio, data[0].link_chat, data[0].link_contrato, data[0].estatus_firma_aliado, data[0].estatus_firma_escuela, data[0].finalizado, data[0].fecha_inicio, data[0].empresa, data[0].escuela);
                setConvenio(thisConvenio);
                console.log(thisConvenio);
            })
    }, [update]);

    const handleGuardar = () => {
        const query = `id_convenio=${convenio.id_convenio}&link_chat=${cambios.link_chat || convenio.link_chat}&link_contrato=${cambios.link_contrato || convenio.link_contrato}&estatus_firma_aliado=${cambios.estatus_firma_aliado || convenio.estatus_firma_aliado}&estatus_firma_escuela=${cambios.estatus_firma_escuela || convenio.estatus_firma_escuela}`;

        fetch(`/api/convenios/update?${query}`, {
            method: 'PUT',
        });

        setUpdate(!update);
    };

    return (
        <div className="convenio-body">
            <div className="convenio-container">
                <button className="convenio-back-button" onClick={() => navigate('/convenios')}>Regresar</button>
                <h1 className="convenio-title">Convenio</h1>
                <h2 className="convenio-subtitle">Cronograma de Avance</h2>
                <p><strong>Escuela:</strong> {convenio.escuela}</p>
                <p><strong>Empresa:</strong>: {convenio.empresa}</p>
                <div className="convenio-cronograma">
                    <div className="convenio-step">
                        <label htmlFor="chat-link" className="convenio-label">Chat:</label>
                        <a href={`http://${convenio.link_chat}`}>{convenio.link_chat}</a><br /><br />
                        <input type="text" id="chat-link" className="convenio-input" placeholder="Nuevo Enlace del Chat" onChange={(e) => setCambios((prev) => ({...prev, link_chat: e.target.value}))}/>
                    </div>
                    <div className="convenio-step">
                        <label htmlFor="file-link" className="convenio-label">Contrato Digital de Convenio:</label>
                        <a href={`http://${convenio.link_contrato}`}>{convenio.link_contrato}</a><br /><br />
                        <input type="text" id="file-link" className="convenio-input" placeholder="Enlace del Contrato Digital de Convenio" onChange={(e) => setCambios((prev) => ({...prev, link_contrato: e.target.value}))}/>
                    </div>
                    <div className="convenio-step">
                        <label htmlFor="accept-agreement" className="convenio-label">
                            {usertype === 'escuela' && <input type="checkbox" id="accept-agreement-school" className="convenio-checkbox" disabled={convenio.estatus_firma_escuela} checked={convenio.estatus_firma_escuela || cambios.estatus_firma_escuela} onChange={(e) => setCambios((prev) => ({...prev, estatus_firma_escuela: e.target.value}))}/>}
                            {usertype === 'aliado' && <input type="checkbox" id="accept-agreement-ally" className="convenio-checkbox" disabled={convenio.estatus_firma_aliado} checked={convenio.estatus_firma_aliado || cambios.estatus_firma_aliado} onChange={(e) => setCambios((prev) => ({...prev, estatus_firma_aliado: e.target.value}))}/>}
                            Aceptar el Convenio
                        </label>
                    </div>
                </div>
                <button className="convenio-submit-button" onClick={handleGuardar}>Guardar</button>
            </div>
        </div>
    );
}

export default PresentConvenio;