import '../css/convenio.css'

function Convenio() {
    return (
        <>
            <div className="container">
                <button className="back-button" onClick="location.href='../convenios/chatlist.html'">Regresar</button>
                <h1>Convenio</h1>
                <h2>Cronograma de Avance</h2>
                <div className="cronograma">
                    <div className="step">
                        <label htmlFor="chat-link">Chat:</label>
                        <input type="text" id="chat-link" placeholder="Ingresa el enlace del chat" />
                    </div>
                    <div className="step">
                        <label htmlFor="file-link">Contrato Digital de Convenio:</label>
                        <input type="text" id="chat-link" placeholder="Ingresa el enlace al Contrato Digital de Convenio" />
                    </div>
                    <div className="step">
                        <label htmlFor="accept-agreement">
                            <input type="checkbox" id="accept-agreement" />
                            Aceptar el Convenio
                        </label>
                    </div>
                </div>
                <button className="submit-button">Guardar</button>
            </div>
        </>
    );
}

export default Convenio;