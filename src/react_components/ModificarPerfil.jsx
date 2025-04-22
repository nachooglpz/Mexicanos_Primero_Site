import '../css/modificar_perfil.css'

function ModificarPerfil () {
    return (
        <>
            <div className="title">
                <h1>Perfil de Usuario:</h1>
            </div>
            <div className="form">
                <form>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" required placeholder="Nombre" /><br /><br />
            
                    <label htmlFor="email">Correo:</label>
                    <input type="email" id="email" name="email" required placeholder="Correo" /><br /><br />
            
                    <label htmlFor="password">Nueva Contraseña:</label>
                    <input type="password" id="password" name="password" required placeholder="Nueva Contraseña" /><br /><br />
            
                    <label htmlFor="address">Dirección:</label>
                    <input type="text" id="address" name="address" placeholder="Dirección" /><br /><br />
            
                    <label htmlFor="userType">Tipo de Usuario:</label>
                    <select id="userType" name="userType">
                        <option value="admin">Escuela</option>
                        <option value="editor">Aliado</option>
                    </select><br /><br />
            
                    <label htmlFor="register-institution">Institución</label>
                    <input type="text" className="form-control" id="register-institution" placeholder="Institución" /><br /><br />

                    <label htmlFor="register-sector">Sector</label>
                    <input type="text" className="form-control" id="register-sector" placeholder="Sector" /><br /><br />


                    <label htmlFor="register-support">Tipo de Apoyo a brindar</label>
                    <input type="text" className="form-control" id="register-support" placeholder="Tipo de apoyo a brindar" /><br /><br />
            
                    <button onclick="location.href='../aliados/aliados.html'" type="submit">Guardar Cambios</button>
                </form>
            </div>
        </>
    );
}

export default ModificarPerfil;