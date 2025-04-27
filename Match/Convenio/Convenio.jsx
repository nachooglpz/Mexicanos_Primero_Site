import './convenio.css';

function Convenio() {
    return (
        <div className="convenio-body">
            <div className="convenio-container">
                <button className="convenio-back-button" onClick="location.href='../convenios/chatlist.html'">Regresar</button>
                <h1 className="convenio-title">Convenio</h1>
                <h2 className="convenio-subtitle">Cronograma de Avance</h2>
                <div className="convenio-cronograma">
                    <div className="convenio-step">
                        <label htmlFor="chat-link" className="convenio-label">Chat:</label>
                        <input type="text" id="chat-link" className="convenio-input" placeholder="Enlace del Chat" />
                    </div>
                    <div className="convenio-step">
                        <label htmlFor="file-link" className="convenio-label">Contrato Digital de Convenio:</label>
                        <input type="text" id="file-link" className="convenio-input" placeholder="Enlace del Contrato Digital de Convenio" />
                    </div>
                    <div className="convenio-step">
                        <label htmlFor="accept-agreement" className="convenio-label">
                            <input type="checkbox" id="accept-agreement" className="convenio-checkbox" />
                            Aceptar el Convenio
                        </label>
                    </div>
                </div>
                <button className="convenio-submit-button">Guardar</button>
            </div>
        </div>
    );
}

export default Convenio;